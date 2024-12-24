import { Navigation } from './Navigation';
import { ThemeSwitch } from './ThemeSwitch';

import type { JSX } from 'react';

export const Header = (): JSX.Element => (
  <header className="mx-auto flex max-w-5xl items-center justify-between px-8 py-6">
    <Navigation />
    <ThemeSwitch />
  </header>
);
