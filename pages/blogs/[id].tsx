import { Content } from '../../types/content';
import Layout from '../../components/Layout';
import Head from 'next/head';
import { GetStaticPaths } from 'next';
import Article from '../../components/Article';
import React from 'react';

type Props = {
  content: Content;
};

const BlogId: React.FC<Props> = ({ content }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{content.title}</title>
      </Head>
      <Article content={content} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const key: string = process.env.API_KEY as string;
  const headers = {
    headers: {
      'X-API-KEY': key,
    },
  };

  const url = `${process.env.ENDPOINT}/blog`;
  const res = await fetch(url, headers);

  const repos = await res.json();

  const paths = repos.contents.map((item: Content) => `/blogs/${item.id}`);
  return {
    paths,
    fallback: false,
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStaticProps = async (context: {
  params: {
    id: string;
  };
}) => {
  const id = context.params.id;
  const key: string = process.env.API_KEY as string;

  const header = {
    headers: {
      'X-API-KEY': key,
    },
  };

  const url = `${process.env.ENDPOINT}/blog/${id}`;
  const res = await fetch(url, header);
  const content: Content = await res.json();

  return {
    props: {
      content,
    },
  };
};

export default BlogId;
