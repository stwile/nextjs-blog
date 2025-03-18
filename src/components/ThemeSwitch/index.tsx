import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { MoonSvg } from '../MoonSvg';

import type { JSX } from 'react';

export const ThemeSwitch = (): JSX.Element | null => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

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
