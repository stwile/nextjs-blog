import { AppProps } from 'next/app';
import React from 'react';
import { Router } from 'next/router';
import * as gtag from '../lib/gtag';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import getConfig from 'next/config';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig();
  const distDir = `${config.serverRuntimeConfig.rootDir}/.next`;
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    integrations: [
      new RewriteFrames({
        iteratee: (frame: Sentry.StackFrame): Sentry.StackFrame => {
          const fileName = frame.filename;
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
  return <Component {...pageProps} err={err} />;
};

Router.events.on('routeChangeComplete', (url: string) => gtag.pageView(url));

export default MyApp;
