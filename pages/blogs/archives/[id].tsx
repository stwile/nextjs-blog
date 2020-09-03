import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ListType } from '../../../types/response/blog/ListType';
import List from '../../../components/blogs/archives/List';
import { ContentType } from '../../../types/response/blog/ContentType';
import { hoge } from '../../index';

type Props = {
  contents: Array<ContentType>;
  current: number;
  count: number;
};

type PageType = {
  contents: Array<ContentType>;
  count: number;
};

const Archives: React.FC<Props> = ({ contents, current, count }: Props) => {
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
  const paginateMax = Math.ceil(totalCount / 5);

  const paths = [...Array(paginateMax).keys()].map(
    (pageNumber: number) => `/blogs/archives/${pageNumber}`,
  );

  // const paths = repos.contents.map((item: ContentType) => `/blogs/archives/${item.id}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: {
  params: {
    id: string;
  };
}) => {
  const current = Number(context.params.id);
  // const offset = current + 3;
  const offset = (current - 1) * 5;
  const key: string = process.env.API_KEY as string;
  const headers = {
    headers: {
      'X-API-KEY': key,
    },
  };
  const url = `${process.env.ENDPOINT}/blog?offset=${offset}`;
  const res = await fetch(url, headers);
  const data: ListType = await res.json();
  const fuga = hoge(data.contents, current, data.totalCount);
  console.log(data.contents[0].title);
  return {
    // props: {
    //   contents: data.contents,
    //   current,
    // },
    props: {
      contents: fuga.contents,
      current,
      count: fuga.count,
    },
  };
};

export default Archives;
