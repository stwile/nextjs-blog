import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

import { ContentType } from '../../types/response/blog/ContentType';
import { Date } from '../../components/Date';
import { Layout } from '../../components/Layout';
import { ListType } from '../../types/blog/PaginationType';
import { client } from '../../lib/microcms';

type Props = {
  content: ContentType;
};

const Blog: React.VFC<Props> = ({ content }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{content.title}</title>
      </Head>
      <article>
        <p className="text-sm">
          <Date dateString={content.publishedAt} />
        </p>
        <h1 className="mb-11">{content.title}</h1>
        {content.body}
      </article>
    </Layout>
  );
};

type Params = {
  id: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}): Promise<{ props: Props }> => {
  if (params === undefined) {
    throw new Error();
  }

  const content: ContentType = await client.get({
    endpoint: `blog/${params.id}`,
  });

  return {
    props: {
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: ListType = await client.get({
    endpoint: 'blog',
  });

  const paths = data.contents.map((item: ContentType) => `/blog/${item.id}`);
  return {
    paths,
    fallback: false,
  };
};

export default Blog;
