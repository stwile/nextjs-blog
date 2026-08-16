import { InnerLink } from '~/components/InnerLink';

type Props = Readonly<{
  totalCount: number;
  currentPage: number;
}>;

export const PER_PAGE = 10;

const Pagination = ({ totalCount, currentPage }: Props) => {
  const range = (start: number, end: number) =>
    [...Array<number>(end - start + 1)].map((_, i) => start + i);

  return (
    <nav aria-label="ページネーション">
      <ul className="flex gap-2" aria-label="ページネーションのリスト">
        {range(1, Math.ceil(totalCount / PER_PAGE)).map((number) => (
          <li
            key={number}
            className={`
              inline-flex h-9 min-w-10 items-center justify-center rounded-md border border-slate-500
              px-0 text-center text-sm text-slate-600 tabular-nums shadow-sm transition-all dark:text-gray-300
              dark:bg-black-special
              hover:border-slate-800 hover:bg-slate-800 hover:text-white hover:shadow-lg dark:hover:bg-slate-700
              focus-within:border-slate-800 focus-within:bg-slate-800 focus-within:text-white
              active:border-slate-800 active:bg-slate-800 active:text-white
              disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
            `}
            aria-label="ページネーションのリストアイテム"
          >
            <InnerLink
              uri={`/blog/page/${number.toString()}`}
              title={number.toString()}
              className="underline underline-offset-2 text-inherit hover:text-inherit focus:text-inherit active:text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100"
              ariaCurrent={number === currentPage ? 'page' : undefined}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Pagination };
