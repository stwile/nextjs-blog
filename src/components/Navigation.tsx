import React from 'react';
import { InnerLink } from './InnerLink';

export const Navigation = (): JSX.Element => {
  return (
    <nav>
      <ul className="flex items-center justify-between">
        <li className="py-4 pr-6">
          <InnerLink uri={'/'} title={'Home'} />
        </li>
      </ul>
    </nav>
  );
};
