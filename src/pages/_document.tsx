import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import type { ReactElement } from 'react';

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="ja">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {GOOGLE_ANALYTICS_ID && <GoogleTagManager gtmId={GOOGLE_ANALYTICS_ID} />}
        </Head>
        <body>
          <Main />
          <NextScript />
          <SpeedInsights />
        </body>
      </Html>
    );
  }
}
