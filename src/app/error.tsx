'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import type { JSX } from 'react';

type Props = Readonly<{
  error: Readonly<Error & { digest?: string }>;
  reset: () => void;
}>;

const Error = ({ error, reset }: Props): JSX.Element => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <section aria-labelledby="error-title" className="py-16 text-center">
      <h1 className="mb-4 text-3xl font-bold" id="error-title">
        エラーが発生しました
      </h1>
      <p className="mb-8">時間をおいて、もう一度お試しください。</p>
      <button className="cursor-pointer underline" onClick={reset} type="button">
        再試行する
      </button>
    </section>
  );
};

export default Error;
