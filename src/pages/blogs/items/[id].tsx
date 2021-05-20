import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

import Item from '../../../components/blogs/Item';
import { ContentType } from '../../../types/response/blog/ContentType';
import { ListType } from '../../../types/response/blog/ListType';
import { getContentById } from '../../../apis/blog';

type Props = {
  content: ContentType;
};

const BlogItem: React.FC<Props> = ({ content }: Props) => {
  return <Item content={content} />;
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

  const repos: ListType = await res.json();

  const paths = repos.contents.map((item: ContentType) => `/blogs/items/${item.id}`);
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
  const content = await getContentById(params.id);
  return {
    props: {
      content,
    },
  };
};

export default BlogItem;
