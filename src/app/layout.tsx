import { GoogleTagManager } from '@next/third-parties/google';

import { Providers } from './providers';

import type { Metadata, Viewport } from 'next';
import type { JSX, ReactNode } from 'react';

import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { createOgImageUrl, siteConfig } from '~/lib/site';

import 'styles/global.css';

type Props = Readonly<{
  children: ReactNode;
}>;

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;

const ogImage = createOgImageUrl(siteConfig.title);

export const metadata: Metadata = {
  metadataBase: siteConfig.siteUrl,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImage],
    locale: 'ja_JP',
    siteName: siteConfig.title,
    type: 'website',
    url: '/',
  },
  robots: {
    follow: true,
    index: true,
    googleBot: {
      'max-image-preview': 'large',
    },
  },
  twitter: {
    card: 'summary_large_image',
    creator: siteConfig.twitterId ? `@${siteConfig.twitterId}` : undefined,
    description: siteConfig.description,
    images: [ogImage],
    title: siteConfig.title,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  other: process.env.NEXT_PUBLIC_CA_PUB_ID
    ? { 'google-adsense-account': process.env.NEXT_PUBLIC_CA_PUB_ID }
    : undefined,
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

const RootLayout = ({ children }: Props): JSX.Element => {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <main className="mx-auto max-w-3xl px-8">{children}</main>
          <Footer />
        </Providers>
        {GOOGLE_ANALYTICS_ID && <GoogleTagManager gtmId={GOOGLE_ANALYTICS_ID} />}
      </body>
    </html>
  );
};

export default RootLayout;
