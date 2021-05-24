import { GetStaticProps } from 'next';
import React from 'react';

import { ContentType } from '../types/response/blog/ContentType';
import { Date } from '../components/Date';
import { Layout } from '../components/Layout';
import { client } from '../lib/microcms';
import { ListType } from '../types/blog/PaginationType';
import { InnerLink } from '../components/InnerLink';

type Props = {
  contents: ContentType[];
};

const Index = ({ contents }: Props): JSX.Element => {
  return (
    <Layout>
      <h1>{process.env.NEXT_PUBLIC_SITE_TITLE || ''}</h1>
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
            <InnerLink uri={`/blog/${content.id}`} title="Read More" />
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
