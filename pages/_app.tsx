import { AppProps } from 'next/app';
import React from 'react';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;