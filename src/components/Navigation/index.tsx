import { InnerLink } from '../InnerLink';

import type { JSX } from 'react';

export const Navigation = (): JSX.Element => (
  <nav aria-label="メイン">
    <ul className="flex items-center justify-between" aria-label="メインのリスト">
      <li className="py-4 pr-6">
        <InnerLink uri="/" title="Home" />
      </li>
    </ul>
  </nav>
);
