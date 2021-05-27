import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

import { ContentType } from '../../types/response/blog/ContentType';
import { Date } from '../../components/Date';
import { Layout } from '../../components/Layout';
import { ListType } from '../../types/blog/PaginationType';
import { client } from '../../lib/microcms';
import { MDXRemoteSerializeResult, MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
// @ts-ignore
import rehypePrism from '@mapbox/rehype-prism';
import 'prismjs/themes/prism-okaidia.css';

import { Tweet } from 'react-twitter-widgets';

type Props = {
  content: ContentType;
  source: MDXRemoteSerializeResult;
};

const components = {
  Tweet,
};

const Blog: React.VFC<Props> = ({ content, source }: Props) => {
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
        <div className="prose">
          <MDXRemote {...source} components={components} />
        </div>
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
  const source = await serialize(content.body, {
    mdxOptions: {
      rehypePlugins: [rehypePrism],
    },
  });
  return {
    props: {
      content,
      source,
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
