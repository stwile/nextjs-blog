import { isValidElement } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ReactElement, ReactNode } from 'react';
import type { ThemeProviderProps } from 'next-themes';

const nextThemeProviderMock = vi.hoisted(() => vi.fn());

vi.mock('next-themes', () => ({
  ThemeProvider: nextThemeProviderMock,
}));

import { ThemeProvider } from '.';

type NextThemeProviderElement = ReactElement<ThemeProviderProps & { children?: ReactNode }>;

const renderThemeProvider = (
  props: Parameters<typeof ThemeProvider>[0],
): NextThemeProviderElement => {
  const element = ThemeProvider(props);

  if (!isValidElement<ThemeProviderProps & { children?: ReactNode }>(element)) {
    throw new Error('Expected NextThemeProvider element');
  }

  return element;
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    nextThemeProviderMock.mockClear();
  });

  it('既定のテーマ設定とchildrenをNextThemeProviderへ渡す', () => {
    const children = <span>content</span>;
    const element = renderThemeProvider({ children });

    expect(element.type).toBe(nextThemeProviderMock);
    expect(element.props.attribute).toBe('class');
    expect(element.props.enableSystem).toBe(false);
    expect(element.props.defaultTheme).toBe('light');
    expect(element.props.children).toBe(children);
  });

  it('追加propsをNextThemeProviderへ渡す', () => {
    const element = renderThemeProvider({ children: 'content', disableTransitionOnChange: true });

    expect(element.props.disableTransitionOnChange).toBe(true);
  });

  it('呼び出し側のpropsで既定値を上書きできる', () => {
    const element = renderThemeProvider({
      children: 'content',
      attribute: 'data-theme',
      enableSystem: true,
      defaultTheme: 'dark',
    });

    expect(element.props.attribute).toBe('data-theme');
    expect(element.props.enableSystem).toBe(true);
    expect(element.props.defaultTheme).toBe('dark');
  });
});
