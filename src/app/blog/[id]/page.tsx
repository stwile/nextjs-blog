import { notFound } from 'next/navigation';

import type { Metadata } from 'next';
import type { JSX } from 'react';
import type { ContentType } from '~/types/response/blog/ContentType';
import type { ListType } from '~/types/response/blog/ListType';

import { Date } from '~/components/Date';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { MdxContent } from '~/components/MdxContent';
import { client } from '~/lib/microcms';
import { serializeBlogMdx } from '~/lib/serializeBlogMdx';

const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE ?? 'ブログタイトル';
const DOMAIN_NAME = process.env.NEXT_PUBLIC_VERCEL_URL ?? 'localhost';

export const dynamicParams = false;

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

export const generateStaticParams = async (): Promise<Params[]> => {
  const { contents }: ListType = await client.get({
    endpoint: 'blog',
    queries: { limit: 100 },
  });

  return contents.map(({ id }) => ({ id }));
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;

  const content: ContentType = await client
    .get({
      endpoint: `blog/${id}`,
    })
    .catch(() => notFound());

  const title = `${content.title} | ${SITE_TITLE}`;
  const description = content.description;
  const image = `https://${DOMAIN_NAME}/api/og?title=${content.title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [image],
    },
  };
};

const BlogDetailPage = async ({ params }: Props): Promise<JSX.Element> => {
  const { id } = await params;

  const content: ContentType = await client
    .get({
      endpoint: `blog/${id}`,
    })
    .catch(() => notFound());

  const source = await serializeBlogMdx(content.body);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-8">
        <article>
          <p className="text-sm">
            <Date dateString={content.publishedAt} />
          </p>
          <h1 className="mb-11">{content.title}</h1>
          <MdxContent source={source} />
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetailPage;
