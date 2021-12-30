import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';

import { Date } from '../components/Date';
import { InnerLink } from '../components/InnerLink';
import { Layout } from '../components/Layout';
import { baseUrl, siteTitle } from '../components/Meta';
import { client } from '../lib/microcms';
import { MetaType } from '../types/blog/MetaType';
import { ContentType } from '../types/response/blog/ContentType';
import { ListType } from '../types/response/blog/ListType';

type Props = {
  contents: ContentType[];
};

const Index = ({ contents }: Props): JSX.Element => {
  const title = process.env.NEXT_PUBLIC_SITE_TITLE || '';

  const meta: MetaType = {
    title: siteTitle,
    image: `${baseUrl}/images/twitter-large.png`,
    description: 'Thinking reeds about book & Technology',
    type: 'blog',
  };
  return (
    <Layout meta={meta}>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      <section>
        {contents.map((content: ContentType) => (
          <article key={content.id} className="mt-12">
            <p className="mb-1 text-sm font-semibold">
              <Date dateString={content.publishedAt} />
            </p>
            <h1 className="mb-2 text-2xl">
              <InnerLink uri={`/blog/${content.id}`} title={content.title} />
            </h1>
            <p className="mb-3 text-sm">{content.description}</p>
          </article>
        ))}
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: ListType = await client.get({
    endpoint: 'blog',
  });
  return {
    props: {
      contents: data.contents,
    },
  };
};

export default Index;
