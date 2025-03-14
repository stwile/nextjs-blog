import Head from 'next/head';
import { useRouter } from 'next/router';

import type { FC } from 'react';
import type { MetaType } from '~/types/blog/MetaType';

export const DOMAIN_NAME: string = process.env.NEXT_PUBLIC_VERCEL_URL ?? 'localhost';
const BASE_URL = `https://www.${DOMAIN_NAME}`;
export const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE ?? 'ブログタイトル';

type Props = {
  meta: MetaType;
};

export const Meta: FC<Props> = ({ meta }) => {
  const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? null;
  const caPubId = process.env.NEXT_PUBLIC_CA_PUB_ID ?? null;
  const twitterId = process.env.NEXT_PUBLIC_TWITTER_ID ?? null;

  const router = useRouter();

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={meta.description} />
      <meta charSet="utf-8" />
      <link rel="canonical" href={BASE_URL} />

      <meta name="robots" content="max-image-preview:large" />

      {googleSiteVerification && (
        <meta name="google-site-verification" content={googleSiteVerification} />
      )}

      <meta property="og:url" content={`${BASE_URL}${router.asPath}`} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="blog" />
      <meta property="og:image" content={meta.image} />
      <meta property="og:site_name" content={SITE_TITLE} />

      {twitterId && (
        <>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content={`@${twitterId}`} />
          <meta name="twitter:image" content={meta.image} />
          <link rel="author" href={`https://twitter.com/${twitterId}`} />
        </>
      )}

      {caPubId && <meta name="google-adsense-account" content={caPubId}></meta>}

      <link rel="icon" href={`${BASE_URL}/favicon.png`} />
      <title>{meta.title}</title>
    </Head>
  );
};
