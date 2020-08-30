import Link from 'next/link';
import React from 'react';
import { GetStaticProps } from 'next';
import { Content } from '../types/content';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import Head from 'next/head';
import { List } from '../types/response/blog/list';
import Date from '../components/Date';
import { Grid } from '@material-ui/core';
import { Today } from '@material-ui/icons';

type Props = {
  contents: Array<Content>;
};

const Home: React.FC<Props> = ({ contents }: Props) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        {contents.map((content: Content) => (
          <React.Fragment key={content.id}>
            <Grid container className={utilStyles.lightText} alignContent="center">
              <Today></Today>
              <Date dateString={content.publishedAt} />
            </Grid>
            <Link href="/blogs/[id]" as={`blogs/${content.id}`}>
              <a>
                <h2>{content.title}</h2>
              </a>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const key: string = process.env.API_KEY as string;
  const headers = {
    headers: {
      'X-API-KEY': key,
    },
  };
  const url = `${process.env.ENDPOINT}/blog`;
  const res = await fetch(url, headers);
  const data: List = await res.json();

  return {
    props: {
      contents: data.contents,
    },
  };
};

export default Home;
