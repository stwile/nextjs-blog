import dynamic from 'next/dynamic';

import { InnerLink } from '../InnerLink';

import type { JSX } from 'react';

export const Header = (): JSX.Element => (
  <header className="mx-auto flex max-w-3xl items-center justify-between px-8 py-6">
    <nav aria-label="ヘッダーのナビゲーション">
      <ul className="flex items-center justify-between" aria-label="ヘッダーのリスト">
        <li className="py-4 pr-6">
          <InnerLink uri="/" title="Home" className="no-underline" />
        </li>
      </ul>
    </nav>
    <ThemeSwitch />
  </header>
);

const ThemeSwitch = dynamic(() => import('../ThemeSwitch').then((mod) => mod.ThemeSwitch), {
  // テーマ判定はクライアント依存のためSSRしない
  ssr: false,
});
