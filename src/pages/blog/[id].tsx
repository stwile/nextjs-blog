import rehypeShiki from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

import type { GetStaticPaths, GetStaticProps } from 'next';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { FC } from 'react';
import type { MetaType } from '~/types/blog/MetaType';
import type { ContentType } from '~/types/response/blog/ContentType';

import { CustomLink } from '~/components/CustomLink';
import { Date } from '~/components/Date';
import { InnerLink } from '~/components/InnerLink';
import { Layout } from '~/components/Layout';
import { DOMAIN_NAME, SITE_TITLE } from '~/components/Meta';
import { Slide } from '~/components/Slide';
import { Twitter } from '~/components/Twitter';
import { client } from '~/lib/microcms';
import { ListType } from '~/types/response/blog/ListType';

type Props = {
  content: ContentType;
  source: MDXRemoteSerializeResult;
};

const components = {
  a: CustomLink,
  Twitter,
  InnerLink,
  Slide,
};

const Blog: FC<Props> = ({ content, source }: Props) => {
  const image = `https://${DOMAIN_NAME}/api/og?title=${content.title}`;

  const meta: MetaType = {
    title: `${content.title} | ${SITE_TITLE}`,
    description: content.description,
    type: 'article',
    image,
  };
  return (
    <Layout meta={meta}>
      <article>
        <p className="text-sm">
          <Date dateString={content.publishedAt} />
        </p>
        <h1 className="mb-11">{content.title}</h1>
        <div className="prose">
          <MDXRemote {...source} components={components} />
        </div>
      </article>
    </Layout>
  );
};

export const getStaticProps = (async ({ params }) => {
  if (params === undefined) {
    throw new Error();
  }
  const { id: blogPathId } = params;
  if (blogPathId === undefined) {
    throw new Error();
  }

  const content: ContentType = await client.get({
    endpoint: `blog/${blogPathId.toString()}`,
  });
  const source = await serialize(content.body, {
    mdxOptions: {
      rehypePlugins: [
        [rehypeShiki, { theme: 'plastic' }],
        rehypeSlug,
        rehypeAutolinkHeadings,
        [
          rehypeExternalLinks,
          {
            target: '_blank',
            rel: ['nofollow', 'noreferrer'],
          },
        ],
      ],
      remarkPlugins: [
        [
          remarkGfm,
          remarkToc,
          {
            heading: '目次', // Table of Contents を挿入するための見出しを指定する
            tight: true, // `true` にすると `li` 要素内に `p` 要素を作らないようになる
          },
        ],
      ],
    },
  });
  return {
    props: {
      content,
      source,
    },
  };
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  const data: ListType = await client.get({
    endpoint: 'blog',
    queries: { limit: 100 }, // FIXME: ページャーを実装したら消すこと
  });

  const paths = data.contents.map((item: ContentType) => `/blog/${item.id}`);
  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export default Blog;
