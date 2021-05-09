import Link from 'next/link';
import React from 'react';

export const Navigation = (): JSX.Element => {
  return (
    <nav>
      <Link href="/">
        <a className="py-4 pr-6 text-gray-900 dark:text-white">Home</a>
      </Link>
    </nav>
  );
};
