import React from 'react';
import { InnerLink } from './InnerLink';

export const Navigation = (): JSX.Element => (
  <nav>
    <ul className="flex items-center justify-between">
      <li className="py-4 pr-6">
        <InnerLink uri="/" title="Home" />
      </li>
    </ul>
  </nav>
);

export default Navigation;
