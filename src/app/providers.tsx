'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import type { FC, ReactNode } from 'react';

import { ThemeProvider } from '~/components/ThemeProvider';

type Props = {
  children: ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <ThemeProvider>
      {children}
      <Analytics />
      {GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />}
      <SpeedInsights />
    </ThemeProvider>
  );
};

export { Providers };
