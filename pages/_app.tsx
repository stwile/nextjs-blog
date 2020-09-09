import { AppProps } from 'next/app';
import React from 'react';
import { Router } from 'next/router';
import * as gtag from '../lib/gtag';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

Router.events.on('routeChangeComplete', (url: string) => gtag.pageView(url));

export default MyApp;
