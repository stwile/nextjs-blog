import React from 'react';

import { Navigation } from './Navigation';
import { ThemeSwitch } from './ThemeSwitch';

export const Header = (): JSX.Element => (
  <header className="flex items-center justify-between max-w-5xl px-8 py-6 mx-auto">
    <Navigation />
    <ThemeSwitch />
  </header>
);

export default Header;
