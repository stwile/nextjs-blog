import Head from 'next/head';
import { useRouter } from 'next/router';

import type { FC } from 'react';
import type { MetaType } from '~/types/blog/MetaType';

export const DOMAIN_NAME: string = process.env.NEXT_PUBLIC_VERCEL_URL ?? 'localhost';
export const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE ?? 'ブログタイトル';

type Props = {
  meta: MetaType;
};

export const Meta: FC<Props> = ({ meta }) => {
  const BASE_URL = `https://www.${DOMAIN_NAME}`;
  const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? null;
  const CA_PUB_ID = process.env.NEXT_PUBLIC_CA_PUB_ID ?? null;
  const TWITTER_ID = process.env.NEXT_PUBLIC_TWITTER_ID ?? null;

  const { asPath } = useRouter();

  const { description, image, title } = meta;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="canonical" href={BASE_URL} />

      <meta name="robots" content="max-image-preview:large" />

      {GOOGLE_SITE_VERIFICATION && (
        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
      )}

      <meta property="og:url" content={`${BASE_URL}${asPath}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="blog" />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_TITLE} />

      {TWITTER_ID && (
        <>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content={`@${TWITTER_ID}`} />
          <meta name="twitter:image" content={image} />
          <link rel="author" href={`https://twitter.com/${TWITTER_ID}`} />
        </>
      )}

      {CA_PUB_ID && <meta name="google-adsense-account" content={CA_PUB_ID}></meta>}

      <link rel="icon" href={`${BASE_URL}/favicon.png`} />
      <title>{title}</title>
    </Head>
  );
};
