import * as Sentry from '@sentry/node';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import '../../styles/global.css';

import * as gtag from '../lib/gtag';

type Props = AppProps & { err: Sentry.Event };

const MyApp: React.FC<Props> = ({ Component, pageProps, err }: Props) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      gtag.pageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return (): void => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <Component {...pageProps} err={err} />
    </ThemeProvider>
  );
};

export default MyApp;
