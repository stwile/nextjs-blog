import Link from 'next/link';

import type { Metadata } from 'next';
import type { JSX } from 'react';

export const metadata: Metadata = {
  title: {
    absolute: '404: This page could not be found',
  },
};

const NotFound = (): JSX.Element => (
  <section aria-labelledby="not-found-title" className="py-16 text-center">
    <h1 className="mb-4 text-4xl font-bold" id="not-found-title">
      404
    </h1>
    <p className="mb-8">お探しのページは見つかりませんでした。</p>
    <Link className="underline" href="/">
      ホームへ戻る
    </Link>
  </section>
);

export default NotFound;
