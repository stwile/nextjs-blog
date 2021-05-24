import React from 'react';

import { Navigation } from './Navigation';

export const Header = (): JSX.Element => {
  return (
    <header className="max-w-5xl px-8 py-5 mx-auto">
      <Navigation />
    </header>
  );
};
