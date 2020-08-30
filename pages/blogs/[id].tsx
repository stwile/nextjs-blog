import { Fragment } from 'react';
import { Chip } from '@material-ui/core';
import { Content } from '../../types/content';
import { Tag } from '../../types/tag';
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/layout';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Date from '../../components/date';
import { GetStaticPaths } from 'next';

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
      <article>
        <h1 className={utilStyles.headingXl}>{content.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={content.publishedAt} />
        </div>
        <div>
          {content.tags.map((tag: Tag) => (
            <Fragment key={tag.id}>
              <Chip
                label={tag.name}
                color="primary"
              />
            </Fragment>
          ))}
        </div>
        <ReactMarkdown source={content.body} skipHtml={true} />
      </article>
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