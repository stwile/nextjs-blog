import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import React, { useEffect } from 'react';

import '../../styles/global.css';

import type { AppProps } from 'next/app';

import * as gtag from '~/lib/gtag';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig();
  const distDir = `${config.serverRuntimeConfig.rootDir}/.next`;
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    integrations: [
      new RewriteFrames({
        iteratee: (frame: Sentry.StackFrame): Sentry.StackFrame => {
          const fileName = frame.filename;
          // eslint-disable-next-line no-param-reassign
          frame.filename = fileName ? fileName.replace(distDir, 'app:///_next') : undefined;
          return frame;
        },
      }),
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

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
