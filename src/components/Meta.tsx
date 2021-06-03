import Head from 'next/head';
import React from 'react';

const domainName: string = process.env.NEXT_PUBLIC_DOMAIN as string;
export const baseUrl = `https://www.${domainName}`;

export const Meta: React.FC = () => {
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || '';
  const imageUrl = `${baseUrl}/images/twitter-large.png`;
  const description = 'Thinking reeds about book & Technology';
  const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={baseUrl} />

      <meta name="robots" content="max-image-preview:large" />

      <meta itemProp="name" content={siteTitle} />
      <meta itemProp="image" content={imageUrl} />
      {googleSiteVerification !== undefined && (
        <meta name="google-site-verification" content={googleSiteVerification} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${process.env.NEXT_PUBLIC_TWITTER_ID}`} />
      <meta name="twitter:creator" content={`@${process.env.NEXT_PUBLIC_TWITTER_ID}`} />

      <meta property="og:url" content={baseUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="blog" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={siteTitle} />
      <meta property="og:site_name" content={siteTitle} />

      <link rel="author" href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_ID}`} />

      <link rel="icon" href={`${baseUrl}/favicon.png`} />
      <title>{siteTitle}</title>
    </Head>
  );
};
