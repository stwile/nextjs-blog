import React from 'react';
import { GetStaticPaths } from 'next';
import { ContentType } from '../../types/response/blog/ContentType';
import List from '../../components/blogs/List';
import { ListType } from '../../types/response/blog/ListType';

type Props = {
  contents: Array<ContentType>;
  current: number;
  count: number;
};

export const ITEM_COUNT = 5;

const TOP_CURRENT = 1;

const Blogs: React.FC<Props> = ({ contents, current, count }: Props) => {
  return <List contents={contents} current={current} count={count} />;
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

  const result: ListType = await res.json();
  const totalCount = result.totalCount;
  const paginateMax = Math.ceil(totalCount / 5) + 1;

  const paths = [...Array(paginateMax).keys()].map((pageNumber: number) => `/blogs/${pageNumber}`);
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
  const current = Number(context.params.id) || TOP_CURRENT;
  const offset = (current - 1) * 5;
  const key: string = process.env.API_KEY as string;
  const headers = {
    headers: {
      'X-API-KEY': key,
    },
  };
  const url = `${process.env.ENDPOINT}/blog?offset=${offset}&limit=${ITEM_COUNT}`;
  const res = await fetch(url, headers);
  const data: ListType = await res.json();

  return {
    props: {
      contents: data.contents,
      current,
      count: Math.ceil(data.totalCount / ITEM_COUNT),
    },
  };
};

export default Blogs;
