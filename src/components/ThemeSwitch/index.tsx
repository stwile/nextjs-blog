'use client';

import { useTheme } from 'next-themes';

import { MoonSvg } from '../MoonSvg';

import type { JSX } from 'react';

export const ThemeSwitch = (): JSX.Element | null => {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) {
    return null;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle Dark Mode"
      onClick={() => {
        setTheme(isDark ? 'light' : 'dark');
      }}
    >
      <MoonSvg isDark={isDark} />
    </button>
  );
};
