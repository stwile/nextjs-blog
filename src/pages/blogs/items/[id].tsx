import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

import Item from '../../../components/blogs/Item';
import { ContentType } from '../../../types/response/blog/ContentType';
import { ListType } from '../../../types/response/blog/ListType';
import { client } from '../../../lib/microcms';

type Props = {
  content: ContentType;
};

const BlogItem: React.FC<Props> = ({ content }: Props) => {
  return <Item content={content} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: ListType = await client.get({
    endpoint: 'blog',
  });

  const paths = data.contents.map((item: ContentType) => `/blogs/items/${item.id}`);
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

  const content: ContentType = await client.get({
    endpoint: `blog/${params.id}`,
  });

  return {
    props: {
      content,
    },
  };
};

export default BlogItem;
