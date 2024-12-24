import { InnerLink } from './InnerLink';

import type { JSX } from 'react';

export const Navigation = (): JSX.Element => (
  <nav>
    <ul className="flex items-center justify-between">
      <li className="py-4 pr-6">
        <InnerLink uri="/" title="Home" />
      </li>
    </ul>
  </nav>
);
