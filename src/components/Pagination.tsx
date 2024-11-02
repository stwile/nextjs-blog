import Link from 'next/link';

import type { FC } from 'react';

type Props = {
  totalCount: number;
};

export const Pagination: FC<Props> = ({ totalCount }) => {
  const PER_PAGE = 10;

  const range = (start: number, end: number) =>
    [...Array<number>(end - start + 1)].map((_, i) => start + i);

  return (
    <ul>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link href={`/blog/page/${number}`}>{number}</Link>
        </li>
      ))}
    </ul>
  );
};
