import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

import { ContentType } from '../../types/response/blog/ContentType';
import { Date } from '../../components/Date';
import { Layout } from '../../components/Layout';
import { ListType } from '../../types/response/blog/ListType';
import { client } from '../../lib/microcms';
import { MDXRemoteSerializeResult, MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
// @ts-ignore
import rehypePrism from '@mapbox/rehype-prism';
// @ts-ignore
import remarkCodeTitles from 'remark-code-titles';
import remarkToc from 'remark-toc';

import { Twitter } from '../../components/Twitter';
import { MetaType } from '../../types/blog/MetaType';
import { siteTitle } from '../../components/Meta';

type Props = {
  content: ContentType;
  source: MDXRemoteSerializeResult;
};

const components = {
  Twitter,
};

const Blog: React.VFC<Props> = ({ content, source }: Props) => {
  const ogpDomain = process.env.NEXT_PUBLIC_OPEN_GRAPH_DOMAIN;
  const image = `https://${ogpDomain}/${encodeURIComponent(content.title)}.png`;

  const meta: MetaType = {
    title: `${siteTitle} 🌋 ${content.title}`,
    description: content.description ?? '', // TODO: must description
    type: 'article;',
    image,
  };
  return (
    <Layout customMeta={meta}>
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

type Params = {
  id: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}): Promise<{ props: Props }> => {
  if (params === undefined) {
    throw new Error();
  }

  const content: ContentType = await client.get({
    endpoint: `blog/${params.id}`,
  });
  const source = await serialize(content.body, {
    mdxOptions: {
      rehypePlugins: [rehypePrism, rehypeSlug, rehypeAutolinkHeadings],
      remarkPlugins: [
        remarkCodeTitles,
        [
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
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data: ListType = await client.get({
    endpoint: 'blog',
  });

  const paths = data.contents.map((item: ContentType) => `/blog/${item.id}`);
  return {
    paths,
    fallback: false,
  };
};

export default Blog;
