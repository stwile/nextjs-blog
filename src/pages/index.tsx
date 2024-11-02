import Head from 'next/head';

import { Date } from '../components/Date';
import { InnerLink } from '../components/InnerLink';
import { Layout } from '../components/Layout';
import { baseUrl, siteTitle } from '../components/Meta';
import { Pagination } from '../components/Pagination';
import { client } from '../lib/microcms';

import type { MetaType } from '../types/blog/MetaType';
import type { ContentType } from '../types/response/blog/ContentType';
import type { ListType } from '../types/response/blog/ListType';
import type { GetStaticProps } from 'next';

type Props = {
  contents: ContentType[];
  totalCount: number;
};

const Index = ({ contents, totalCount }: Props): JSX.Element => {
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
        {contents.map((content) => (
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
      <Pagination totalCount={totalCount} />
    </Layout>
  );
};

export const getStaticProps = (async () => {
  const data: ListType = await client.get({
    endpoint: 'blog',
    queries: { offset: 0, limit: 10 },
  });
  return {
    props: {
      contents: data.contents,
      totalCount: data.totalCount,
    },
  };
}) satisfies GetStaticProps;

export default Index;
