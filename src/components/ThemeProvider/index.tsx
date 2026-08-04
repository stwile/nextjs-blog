'use client';

import { ThemeProvider as NextThemeProvider, type ThemeProviderProps } from 'next-themes';

import type { ReactNode } from 'react';

type Props = Readonly<
  {
    children: ReactNode;
  } & ThemeProviderProps
>;

const ThemeProvider = ({ children, ...themeProviderProps }: Props) => {
  return (
    <NextThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="light"
      {...themeProviderProps}
    >
      {children}
    </NextThemeProvider>
  );
};

export { ThemeProvider };
