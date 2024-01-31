import { Analytics } from '@vercel/analytics/react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';

import '../../styles/global.css';

import type { AppProps } from 'next/app';
import type { FC } from 'react';

import * as gtag from '~/lib/gtag';

type Props = AppProps;

const MyApp: FC<Props> = ({ Component, pageProps }: Props) => {
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
      <Analytics />
    </ThemeProvider>
  );
};

export default MyApp;
