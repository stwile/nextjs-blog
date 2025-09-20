import { ThemeProvider as NextThemeProvider, type ThemeProviderProps } from 'next-themes';
import { type FC, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
} & ThemeProviderProps;

export const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <NextThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      {children}
    </NextThemeProvider>
  );
};
