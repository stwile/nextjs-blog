import { ThemeProvider as NextThemeProvider, type ThemeProviderProps } from 'next-themes';
import React, { FC } from 'react';

type Props = {
  children: React.ReactNode;
} & ThemeProviderProps;

export const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <NextThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      {children}
    </NextThemeProvider>
  );
};
