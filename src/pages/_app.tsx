import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import '../../styles/global.css';
import * as gtag from '../lib/gtag';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
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
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
