import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';

import '../../styles/global.css';

import type { AppProps } from 'next/app';
import type { FC } from 'react';

type Props = AppProps;

const MyApp: FC<Props> = ({ Component, pageProps }: Props) => {
  const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <Component {...pageProps} />
      <Analytics />
      {GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />}
    </ThemeProvider>
  );
};

export default MyApp;
