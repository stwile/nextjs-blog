import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export const siteTitle = process.env.SITE_TITLE as string;

export const Meta: React.FC = (): JSX.Element => {
  const domainName: string = process.env.DOMAIN as string;
  const description = process.env.DESCRIPTION as string;

  const twitterId = process.env.TWITTER_ID as string;

  const router = useRouter();
  const baseUrl = `https://${domainName}/`;
  const url = `${baseUrl}${router.asPath}`;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="max-image-preview:large" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={url} />

      <meta itemProp="name" content={siteTitle} />
      <meta name="description" content="Web Technology and Read Books" />

      {/* <meta itemProp="image" content="" /> */}

      <meta name="og:title" content={siteTitle} />
      <meta property="og:type" content="blog" />
      <meta property="og:url" content={url} />
      {/* <meta property="og:image" content="" /> */}
      {/* <meta property="og:image:alt" content={siteTitle} /> */}
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:image" content="" /> */}
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />

      <link rel="author" href={`https://twitter.com/${twitterId}`} />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
