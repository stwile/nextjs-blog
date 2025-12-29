import type { FC } from 'react';

import { InnerLink } from '~/components/InnerLink';

type Props = {
  totalCount: number;
};

export const PER_PAGE = 10;

export const Pagination: FC<Props> = ({ totalCount }) => {
  const range = (start: number, end: number) =>
    [...Array<number>(end - start + 1)].map((_, i) => start + i);

  return (
    <ul className="flex space-x-1" aria-label="ページネーションのリスト">
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li
          key={index}
          className={`
            ml-2 min-w-9 rounded-md border border-slate-300 px-3 py-2 text-center text-sm
            text-slate-600 shadow-sm transition-all
            hover:border-slate-800 hover:bg-slate-800 hover:text-white hover:shadow-lg
            focus:border-slate-800 focus:bg-slate-800 focus:text-white
            active:border-slate-800 active:bg-slate-800 active:text-white
            disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
          `}
          aria-label="ページネーションのリストアイテム"
        >
          <InnerLink uri={`/blog/page/${number.toString()}`} title={number.toString()} />
        </li>
      ))}
    </ul>
  );
};
