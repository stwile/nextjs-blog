import { GoogleTagManager } from '@next/third-parties/google';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import type { ReactElement } from 'react';

export default class MyDocument extends Document {
  render(): ReactElement {
    const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;
    return (
      <Html lang="ja">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {GOOGLE_ANALYTICS_ID && <GoogleTagManager gtmId={GOOGLE_ANALYTICS_ID} />}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
