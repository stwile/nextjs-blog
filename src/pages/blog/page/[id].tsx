import Head from 'next/head';

import type { GetStaticProps } from 'next';
import type { MetaType } from '~/types/blog/MetaType';
import type { ContentType } from '~/types/response/blog/ContentType';
import type { ListType } from '~/types/response/blog/ListType';

import { Date } from '~/components/Date';
import { InnerLink } from '~/components/InnerLink';
import { Layout } from '~/components/Layout';
import { siteTitle, baseUrl } from '~/components/Meta';
import { Pagination } from '~/components/Pagination';
import { client } from '~/lib/microcms';

const PER_PAGE = 10;

type Props = {
  contents: ContentType[];
  totalCount: number;
};

const BlogPageId = ({ contents, totalCount }: Props) => {
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
      <div className="flex justify-center">
        <Pagination totalCount={totalCount} />
      </div>
    </Layout>
  );
};

// 動的なページを作成;
export const getStaticPaths = async () => {
  const repos: ListType = await client.get({ endpoint: 'blog' });

  const range = (start: number, end: number) =>
    [...Array<number>(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`,
  );

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = (async (context) => {
  const id = Number(context?.params?.id);

  const data: ListType = await client.get({
    endpoint: 'blog',
    queries: {
      offset: (id - 1) * PER_PAGE,
      limit: PER_PAGE,
    },
  });

  return {
    props: {
      contents: data.contents,
      totalCount: data.totalCount,
    },
  };
}) satisfies GetStaticProps;

export default BlogPageId;
