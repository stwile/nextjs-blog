import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ComponentProps } from 'react';
import type { ListType } from '~/types/response/blog/ListType';

import { BlogLayout } from '~/components/BlogLayout';
import { PER_PAGE } from '~/components/Pagination';
import { client } from '~/lib/microcms';

type Props = ComponentProps<typeof BlogLayout>;

const BlogPageId = ({ contents, totalCount }: Props) => {
  return <BlogLayout contents={contents} totalCount={totalCount} />;
};

// 動的なページを作成;
export const getStaticPaths = (async () => {
  const repos: ListType = await client.get({ endpoint: 'blog' });

  const range = (start: number, end: number) =>
    [...Array<number>(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo.toString()}`,
  );

  return { paths, fallback: false };
}) satisfies GetStaticPaths;

// データを取得
export const getStaticProps = (async (context) => {
  const id = Number(context.params?.id);

  const data: ListType = await client.get({
    endpoint: 'blog',
    queries: {
      offset: (id - 1) * PER_PAGE,
      limit: PER_PAGE,
    },
  });

  return {
    props: {
      contents: data.contents,
      totalCount: data.totalCount,
    },
  };
}) satisfies GetStaticProps<Props>;

export default BlogPageId;
