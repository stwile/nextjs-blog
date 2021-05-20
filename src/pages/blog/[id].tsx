import { rehypePrism } from '@mapbox/rehype-prism';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemoteSerializeResult, MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import React from 'react';

import { ContentType } from '../../../types/response/blog/ContentType';
import { getContentById, getAllContents } from '../../apis/blog';
import { Date } from '../../components/Date';
import { Layout } from '../../components/Layout';
import { Tomato } from '../../components/Tomato';

const components = {
  Tomato,
};

type Props = {
  content: ContentType;
  source: MDXRemoteSerializeResult;
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
        {/* <h1 className="mb-3 text-gray-900 dark:text-white">{content.title}</h1> */}
        <h1 className="mb-11">{content.title}</h1>
        {/* <p className="mb-10 text-sm text-gray-500 dark:text-gray-400"> */}
        {/* <div className="prose dark:prose-dark"> */}
        <div className="prose dark:prose-dar">
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
  const content = await getContentById(params.id);
  const source = await serialize(content.body, {
    mdxOptions: {
      rehypePlugins: [rehypePrism],
    },
  });
  console.log(content.body);
  return {
    props: {
      content,
      source,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const contents = await getAllContents();

  const paths = contents.map((item: ContentType) => `/blog/${item.id}`);
  return {
    paths,
    fallback: false,
  };
};

export default Blog;
