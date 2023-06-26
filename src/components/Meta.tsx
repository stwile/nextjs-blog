import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import type { MetaType } from '../types/blog/MetaType';

const domainName: string = process.env.NEXT_PUBLIC_DOMAIN as string;
export const baseUrl = `https://www.${domainName}`;
export const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || '';

type Props = {
  meta: MetaType;
};

export const Meta: React.FC<Props> = ({ meta }) => {
  const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;

  const router = useRouter();

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={meta.description} />
      <meta charSet="utf-8" />
      <link rel="canonical" href={baseUrl} />

      <meta name="robots" content="max-image-preview:large" />

      <meta itemProp="name" content={meta.title} />
      <meta itemProp="image" content={meta.image} />
      {googleSiteVerification !== undefined && (
        <meta name="google-site-verification" content={googleSiteVerification} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${process.env.NEXT_PUBLIC_TWITTER_ID}`} />
      <meta name="twitter:creator" content={`@${process.env.NEXT_PUBLIC_TWITTER_ID}`} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image:src" content={meta.image} />

      <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="blog" />
      <meta property="og:image" content={meta.image} />
      <meta property="og:site_name" content={siteTitle} />

      <link rel="author" href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_ID}`} />

      <link rel="icon" href={`${baseUrl}/favicon.png`} />
      <title>{meta.title}</title>
    </Head>
  );
};
