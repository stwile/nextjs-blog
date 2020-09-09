import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { GOOGLE_ANALYTICS_ID, existsGaId } from '../lib/gtag';
import React, { ReactElement } from 'react';

type Props = {};

export default class Document extends NextDocument<Props> {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {existsGaId ? (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GOOGLE_ANALYTICS_ID}', {
                    page_path: window.location.pathname,
                  });`,
                }}
              />
            </>
          ) : null}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
