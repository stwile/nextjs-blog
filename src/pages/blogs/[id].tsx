import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

import { List } from '../../components/blogs/List';
import { ContentType } from '../../types/response/blog/ContentType';
import { ListType } from '../../types/response/blog/ListType';
import { getAllContents } from '../../apis/blog';

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

type Params = {
  id: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}): Promise<{ props: Props }> => {
  if (params === undefined) {
    throw new Error();
  }
  const current = Number(params.id) || TOP_CURRENT;
  const offset = (current - 1) * 5;

  const data = await getAllContents({
    offset,
    limit: ITEM_COUNT,
  });

  return {
    props: {
      contents: data.contents,
      current,
      count: Math.ceil(data.totalCount / ITEM_COUNT),
    },
  };
};

export default Blogs;
