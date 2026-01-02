import { GoogleTagManager } from '@next/third-parties/google';

import { Providers } from './providers';

import type { JSX, ReactNode } from 'react';

import 'styles/global.css';

type Props = {
  children: ReactNode;
};

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;

const RootLayout = ({ children }: Props): JSX.Element => {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        {GOOGLE_ANALYTICS_ID && <GoogleTagManager gtmId={GOOGLE_ANALYTICS_ID} />}
      </body>
    </html>
  );
};

export default RootLayout;
