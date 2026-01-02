import type { Metadata } from 'next';
import type { JSX } from 'react';
import type { ListType } from '~/types/response/blog/ListType';

import { Date } from '~/components/Date';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { InnerLink } from '~/components/InnerLink';
import { Pagination, PER_PAGE } from '~/components/Pagination';
import { client } from '~/lib/microcms';

const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE ?? 'ブログタイトル';
const DOMAIN_NAME = process.env.NEXT_PUBLIC_VERCEL_URL ?? 'localhost';
const DESCRIPTION = 'Thinking reeds about book & Technology';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: DESCRIPTION,
    type: 'website',
    images: [`https://${DOMAIN_NAME}/api/og?title=${SITE_TITLE}`],
  },
};

const Home = async (): Promise<JSX.Element> => {
  const data: ListType = await client.get({
    endpoint: 'blog',
    queries: { offset: 0, limit: PER_PAGE },
  });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-8">
        <h1>{SITE_TITLE}</h1>
        <section>
          {data.contents.map(({ id, publishedAt, title, description }) => (
            <article key={id} className="mt-12">
              <p className="mb-1 text-sm font-semibold">
                <Date dateString={publishedAt} />
              </p>
              <h1 className="mb-2 text-2xl">
                <InnerLink uri={`/blog/${id}`} title={title} />
              </h1>
              <p className="mb-3 text-sm">{description}</p>
            </article>
          ))}
        </section>
        <div className="flex justify-center">
          <Pagination totalCount={data.totalCount} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
