import { Content } from '../../types/content';
import Layout from '../../components/layout';
import Head from 'next/head';
import { GetStaticPaths } from 'next';
import Article from '../../components/Article';

const BlogId = ({
  content
}: {
  content: Content
}) => {
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
  const key: string = process.env.API_KEY!;
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
    fallback: false
  };
};

export const getStaticProps = async (context: {
  params: {
    id: string;
  };
}) => {
  const id = context.params.id;
  const key: string = process.env.API_KEY!;

  const header = {
    headers: {
      'X-API-KEY': key,
    },
  };

  const url = `${process.env.ENDPOINT}/blog/${id}`;
  const res = await fetch(url, header);
  const content: Content = await res.json();

  return {
    props : {
      content,
    }
  };
};

export default BlogId;