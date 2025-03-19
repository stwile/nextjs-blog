import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { ThemeProvider } from '../components/ThemeProvider';

import 'styles/global.css';

import type { AppProps } from 'next/app';
import type { FC } from 'react';

type Props = AppProps;

const MyApp: FC<Props> = ({ Component, pageProps }: Props) => {
  const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Analytics />
      {GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />}
      <SpeedInsights />
    </ThemeProvider>
  );
};

export default MyApp;
