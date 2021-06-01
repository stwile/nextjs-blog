import Head from 'next/head';
import React from 'react';

const domainName: string = process.env.DOMAIN as string;
export const baseUrl = `https://www.${domainName}`;

export const Meta: React.FC = () => {
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || '';

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={baseUrl} />

      <meta itemProp="name" content={siteTitle} />
      <meta name="description" content="Web Technology and Read Books" />

      {/* <meta itemProp="image" content="" /> */}

      <meta name="og:title" content={siteTitle} />
      <meta property="og:type" content="blog" />
      <meta property="og:url" content={baseUrl} />
      {/* <meta property="og:image" content="" /> */}
      {/* <meta property="og:image:alt" content={siteTitle} /> */}
      <meta property="og:description" content={siteTitle} />
      <meta property="og:site_name" content={siteTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:image" content="" /> */}
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteTitle} />

      <link rel="author" href={`https://twitter.com/${process.env.TWITTER_ID}`} />

      <link rel="icon" href={`${baseUrl}/favicon.png`} />
      <title>{siteTitle}</title>
    </Head>
  );
};
