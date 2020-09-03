import React from 'react';
import { GetStaticProps } from 'next';
import { ContentType } from '../types/response/blog/ContentType';
import { ListType } from '../types/response/blog/ListType';
import List from '../components/blogs/archives/List';

type Props = {
  contents: Array<ContentType>;
  totalCount: number;
};

const TOP_PAGE_NUMBER = 1;

type PageType = {
  contents: Array<ContentType>;
  count: number;
};

export const hoge = (
  contents: Array<ContentType>,
  current: number,
  totalCount: number,
): PageType => {
  const ITEM_COUNT = 5;
  const start = Math.ceil(current - 1) * ITEM_COUNT;
  return {
    contents: contents.slice(start, start + ITEM_COUNT),
    count: Math.ceil(totalCount / ITEM_COUNT),
  };
};

const Home: React.FC<Props> = ({ contents, totalCount }: Props) => {
  const items: PageType = hoge(contents, TOP_PAGE_NUMBER, totalCount);
  return <List contents={items.contents} current={TOP_PAGE_NUMBER} count={items.count} />;
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
  const data: ListType = await res.json();

  return {
    props: {
      contents: data.contents,
      totalCount: data.totalCount,
    },
  };
};

export default Home;
