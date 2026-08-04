import { notFound } from 'next/navigation';

import type { Metadata } from 'next';
import type { JSX } from 'react';
import type { ListType } from '~/types/response/blog/ListType';

import { Date } from '~/components/Date';
import { InnerLink } from '~/components/InnerLink';
import { Pagination, PER_PAGE } from '~/components/Pagination';
import { client } from '~/lib/microcms';
import { createOgImageUrl, siteConfig } from '~/lib/site';

export const dynamicParams = false;

type Params = {
  id: string;
};

export const generateStaticParams = async (): Promise<Params[]> => {
  const repos: ListType = await client.get({ endpoint: 'blog' });
  const totalPages = Math.ceil(repos.totalCount / PER_PAGE);

  return Array.from({ length: totalPages }, (_, index) => ({
    id: String(index + 1),
  }));
};

type Props = {
  params: Promise<Params>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  const pathname = `/blog/page/${id}`;

  return {
    title: {
      absolute: siteConfig.title,
    },
    description: siteConfig.description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      images: [createOgImageUrl(siteConfig.title)],
      type: 'website',
      url: pathname,
    },
  };
};

const BlogPage = async ({ params }: Props): Promise<JSX.Element> => {
  const { id } = await params;
  const pageId = Number(id);

  if (!Number.isInteger(pageId) || pageId < 1) {
    notFound();
  }

  const { contents, totalCount }: ListType = await client.get({
    endpoint: 'blog',
    queries: {
      offset: (pageId - 1) * PER_PAGE,
      limit: PER_PAGE,
    },
  });

  const totalPages = Math.ceil(totalCount / PER_PAGE);
  if (pageId > totalPages) {
    notFound();
  }

  return (
    <>
      <h1>
        {siteConfig.title} - {pageId}ページ目
      </h1>
      <section>
        {contents.map(({ id, publishedAt, title, description }) => (
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
        <Pagination totalCount={totalCount} currentPage={pageId} />
      </div>
    </>
  );
};

export default BlogPage;
