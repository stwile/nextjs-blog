import type { Metadata } from 'next';
import type { JSX } from 'react';

import { Date } from '~/components/Date';
import { InnerLink } from '~/components/InnerLink';
import { Pagination, PER_PAGE } from '~/components/Pagination';
import { createOgImageUrl, siteConfig } from '~/lib/site';

import { getBlogList } from '~/features/blog';

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
    url: '/',
    images: [createOgImageUrl(siteConfig.title)],
  },
};

const Home = async (): Promise<JSX.Element> => {
  const { items, totalCount } = await getBlogList({ page: 1, perPage: PER_PAGE });

  return (
    <>
      <h1>{siteConfig.title}</h1>
      <section>
        {items.map(({ id, publishedAt, title, description }) => (
          <article key={id} className="mt-12">
            <p className="mb-1 text-sm font-semibold">
              <Date dateString={publishedAt} />
            </p>
            <h2 className="mb-2 text-2xl">
              <InnerLink uri={`/blog/${id}`} title={title} />
            </h2>
            <p className="mb-3 text-sm">{description}</p>
          </article>
        ))}
      </section>
      <div className="flex justify-center">
        <Pagination totalCount={totalCount} currentPage={1} />
      </div>
    </>
  );
};

export default Home;
