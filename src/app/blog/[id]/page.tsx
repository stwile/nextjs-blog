import rehypeShiki from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import remarkGfm from 'remark-gfm';

import type { Metadata } from 'next';
import type { MDXRemoteProps } from 'next-mdx-remote-client/rsc';
import type { JSX } from 'react';

import { CustomLink } from '~/components/CustomLink';
import { Docswell } from '~/components/Docswell';
import { InnerLink } from '~/components/InnerLink';
import { Podcast } from '~/components/Podcast';
import { SpeakerDeck } from '~/components/SpeakerDeck';
import { Twitter } from '~/components/Twitter';
import { createSafeMdxOptions } from '~/lib/mdx';
import { createOgImageUrl, siteConfig } from '~/lib/site';

import { BlogArticle } from '~/features/blog/components/BlogArticle';
import { getAllBlogIds, getBlogById } from '~/features/blog';
import type { BlogPost } from '~/features/blog';
import { BlogNotFoundError } from '~/features/blog/blog-not-found-error';

export const dynamicParams = false;

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

const mdxComponents = {
  a: CustomLink,
  CustomLink,
  Docswell,
  InnerLink,
  Podcast,
  SpeakerDeck,
  Twitter,
} satisfies NonNullable<MDXRemoteProps['components']>;

const mdxOptions = createSafeMdxOptions(
  {
    rehypePlugins: [[rehypeShiki, { theme: 'plastic' }]],
    remarkPlugins: [remarkGfm],
  },
  mdxComponents,
);

const getCachedBlogContent = cache(async (id: string): Promise<BlogPost> => {
  try {
    return await getBlogById(id);
  } catch (error) {
    if (error instanceof BlogNotFoundError) {
      notFound();
    }

    throw error;
  }
});

export const generateStaticParams = async (): Promise<Params[]> => {
  const ids = await getAllBlogIds();
  return ids.map((id) => ({ id }));
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  const content = await getCachedBlogContent(id);
  const ogImage = createOgImageUrl(content.title);

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: `/blog/${content.id}`,
    },
    openGraph: {
      title: `${content.title} | ${siteConfig.title}`,
      description: content.description,
      images: [ogImage],
      type: 'article',
      url: `/blog/${content.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      creator: siteConfig.twitterId ? `@${siteConfig.twitterId}` : undefined,
      description: content.description,
      images: [ogImage],
      title: `${content.title} | ${siteConfig.title}`,
    },
  };
};

const BlogPage = async ({ params }: Props): Promise<JSX.Element> => {
  const { id } = await params;
  const content = await getCachedBlogContent(id);

  return (
    <BlogArticle content={content}>
      <MDXRemote source={content.body} components={mdxComponents} options={mdxOptions} />
    </BlogArticle>
  );
};

export default BlogPage;
