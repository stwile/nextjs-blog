import Link from 'next/link';
import React from 'react';
import { GetStaticProps } from 'next';
import { Content } from '../types/content';
import Layout from '../components/layout';
import Head from 'next/head';
import { List } from '../types/response/blog/list';
import { makeStyles, Theme } from '@material-ui/core';
import Article from '../components/Article';
import Pager from '../components/Pager';

const useStyles = makeStyles((theme: Theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const Home = ({
  contents
}: {
  contents: Array<Content>
}) => {
  const latestContent: Content = contents[0];
  const nextContent: Content = contents[1];

  return (
    <Layout>
      <Head>
        <title>{latestContent.title}</title>
      </Head>
      <Article content={latestContent} />
      <Pager nextContent={nextContent} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const key: string = process.env.API_KEY!;
  const headers = {
    headers: {
      'X-API-KEY': key,
    },
  };
  const url = `${process.env.ENDPOINT}/blog?limit=2`;
  const res = await fetch(url, headers);
  const data: List = await res.json();

  return {
    props: {
      contents: data.contents,
    }
  }
}

export default Home;