import { ContentType } from '../../types/response/blog/ContentType';
import Layout from '../Layout';
import Head from 'next/head';
import Article from '../Article';
import React from 'react';
import Link from 'next/link';

type Props = {
  content: ContentType;
  current: number;
};

const Item: React.FC<Props> = ({ content, current }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{content.title}</title>
      </Head>
      <Article content={content} />
      <Link href="items/[id]" as={`items/${current}`}>
        <a>Back</a>
      </Link>
    </Layout>
  );
};

export default Item;
