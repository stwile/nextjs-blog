'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import '../../styles/global.css';

import type { JSX } from 'react';

type Props = Readonly<{
  error: Readonly<Error & { digest?: string }>;
  reset: () => void;
}>;

const GlobalError = ({ error, reset }: Props): JSX.Element => {
  useEffect(() => {
    void Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <title>エラーが発生しました</title>
      </head>
      <body>
        <main className="mx-auto max-w-3xl px-8">
          <section aria-labelledby="global-error-title" className="py-16 text-center">
            <h1 className="mb-4 text-3xl font-bold" id="global-error-title">
              エラーが発生しました
            </h1>
            <p className="mb-8">時間をおいて、もう一度お試しください。</p>
            <button className="cursor-pointer underline" onClick={reset} type="button">
              再試行する
            </button>
          </section>
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
