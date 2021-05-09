import { useTheme } from 'next-themes';
import React, { useState } from 'react';

/**
 * Based off of gatsby-theme-novela
 * https://github.com/narative/gatsby-theme-novela/blob/master/%40narative/gatsby-theme-novela/src/components/Navigation/Navigation.Header.tsx
 */

export const ThemeSwitch = (): JSX.Element | null => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  React.useEffect(() => setMounted(true), []);

  if (mounted === false) {
    return null;
  }

  const isDark = theme === 'dark';
  const color = isDark ? '#fff' : '#000';
  const maskColor = isDark ? '#000' : '#fff';
  return (
    <button
      className="theme-button"
      type="button"
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isDark ? '#fff' : '#000'}
        stroke={isDark ? '#fff' : '#000'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
};
