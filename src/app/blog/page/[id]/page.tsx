import type { JSX } from 'react';
import type { ListType } from '~/types/response/blog/ListType';

import { Date } from '~/components/Date';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { InnerLink } from '~/components/InnerLink';
import { Pagination, PER_PAGE } from '~/components/Pagination';
import { client } from '~/lib/microcms';

const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE ?? 'ブログタイトル';

type Props = {
  params: {
    id: string;
  };
};

export const generateStaticParams = async (): Promise<Props['params'][]> => {
  const repos: ListType = await client.get({ endpoint: 'blog' });
  const totalPages = Math.ceil(repos.totalCount / PER_PAGE);

  return Array.from({ length: totalPages }, (_, index) => ({
    id: String(index + 1),
  }));
};

const BlogPage = async ({ params }: Props): Promise<JSX.Element> => {
  const pageId = Number(params.id);

  const { contents, totalCount }: ListType = await client.get({
    endpoint: 'blog',
    queries: {
      offset: (pageId - 1) * PER_PAGE,
      limit: PER_PAGE,
    },
  });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-8">
        <h1>{SITE_TITLE}</h1>
        <section>
          {contents.map(({ id, publishedAt, title, description }) => (
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
          <Pagination totalCount={totalCount} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
