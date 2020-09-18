import Head from 'next/head';
import React from 'react';
import { siteTitle } from './Layout';

const Meta: React.FC = () => {
  const domainName: string = process.env.DOMAIN as string;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="max-image-preview:large" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={`https://${domainName}/`} />

      <meta itemProp="name" content={siteTitle} />
      <meta name="description" content="Web Technology and Read Books" />

      {/* <meta itemProp="image" content="" /> */}

      <meta name="og:title" content={siteTitle} />
      <meta property="og:type" content="blog" />
      <meta property="og:url" content={`https://${domainName}/`} />
      {/* <meta property="og:image" content="" /> */}
      {/* <meta property="og:image:alt" content={siteTitle} /> */}
      <meta property="og:description" content={siteTitle} />
      <meta property="og:site_name" content={siteTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:image" content="" /> */}
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteTitle} />

      <link rel="author" href="https://twitter.com/handm871" />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
