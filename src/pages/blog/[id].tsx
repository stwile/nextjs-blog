// @ts-ignore
import rehypePrism from '@mapbox/rehype-prism';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemoteSerializeResult, MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import React from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
// @ts-ignore
import remarkCodeTitles from 'remark-code-titles';
import remarkToc from 'remark-toc';

import { Date } from '../../components/Date';
import { Layout } from '../../components/Layout';
import { siteTitle } from '../../components/Meta';
import { OuterLink } from '../../components/OuterLink';
import { Twitter } from '../../components/Twitter';
import { client } from '../../lib/microcms';
import { MetaType } from '../../types/blog/MetaType';
import { ContentType } from '../../types/response/blog/ContentType';
import { ListType } from '../../types/response/blog/ListType';

type Props = {
  content: ContentType;
  source: MDXRemoteSerializeResult;
};

const components = {
  Twitter,
  OuterLink,
};

const Blog: React.VFC<Props> = ({ content, source }: Props) => {
  const ogpDomain = process.env.NEXT_PUBLIC_OPEN_GRAPH_DOMAIN;
  const image = `https://${ogpDomain}/${encodeURIComponent(content.title)}.png`;

  const meta: MetaType = {
    title: `${content.title} | ${siteTitle}`,
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
