import type { GetStaticPaths, GetStaticProps } from 'next';
import type { SerializeResult } from 'next-mdx-remote-client/serialize';
import type { FC } from 'react';
import type { ContentType } from '~/types/response/blog/ContentType';
import type { ListType } from '~/types/response/blog/ListType';

import { BlogArticle } from '~/components/BlogArticle';
import { client } from '~/lib/microcms';
import { serializeBlogMdx } from '~/lib/serializeBlogMdx';

type Props = {
  content: ContentType;
  source: SerializeResult;
};

const Blog: FC<Props> = ({ content, source }: Props) => {
  return <BlogArticle content={content} source={source} />;
};

export const getStaticProps = (async ({ params }) => {
  if (params === undefined) {
    throw new Error();
  }
  const { id: blogPathId } = params;
  if (blogPathId === undefined) {
    throw new Error();
  }

  const content: ContentType = await client.get({
    endpoint: `blog/${blogPathId.toString()}`,
  });
  const source = await serializeBlogMdx(content.body);
  return {
    props: {
      content,
      source,
    },
  };
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  const data: ListType = await client.get({
    endpoint: 'blog',
    queries: { limit: 100 }, // FIXME: ページャーを実装したら消すこと
  });

  const paths = data.contents.map((item: ContentType) => `/blog/${item.id}`);
  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export default Blog;
