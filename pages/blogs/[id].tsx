import { ContentType } from '../../types/ContentType';
import { GetStaticPaths } from 'next';
import React from 'react';
import Item from '../../components/blogs/Item';

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

  const repos = await res.json();

  const paths = repos.contents.map((item: ContentType) => `/blogs/${item.id}`);
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
  const id = context.params.id;
  const key: string = process.env.API_KEY as string;

  const header = {
    headers: {
      'X-API-KEY': key,
    },
  };

  const url = `${process.env.ENDPOINT}/blog/${id}`;
  const res = await fetch(url, header);
  const content: ContentType = await res.json();

  return {
    props: {
      content,
    },
  };
};

export default BlogItem;
