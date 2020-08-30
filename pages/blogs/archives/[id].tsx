import React from 'react';
import { GetStaticProps } from 'next';
import { ContentType } from '../../../types/ContentType';
import { ListType } from '../../../types/response/blog/ListType';
import List from '../../../components/blogs/archives/List';

type Props = {
  contents: Array<ContentType>;
};

const Archives: React.FC<Props> = ({ contents }: Props) => {
  return <List contents={contents} />;
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
    },
  };
};

export default Archives;
