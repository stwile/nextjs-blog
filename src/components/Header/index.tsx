import { InnerLink } from '../InnerLink';
import { ThemeSwitch } from '../ThemeSwitch';

import type { JSX } from 'react';

export const Header = (): JSX.Element => (
  <header className="mx-auto flex max-w-5xl items-center justify-between px-8 py-6">
    <nav aria-label="ヘッダーのナビゲーション">
      <ul className="flex items-center justify-between" aria-label="ヘッダーのリスト">
        <li className="py-4 pr-6">
          <InnerLink uri="/" title="Home" />
        </li>
      </ul>
    </nav>
    <ThemeSwitch />
  </header>
);
