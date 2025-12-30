import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

import { MoonSvg } from '../MoonSvg';

import type { JSX } from 'react';

export const ThemeSwitch = (): JSX.Element | null => {
  const { resolvedTheme, setTheme } = useTheme();
  // next-themes の初期化完了まで描画を抑えて SSR/CSR の差分を避ける。
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  if (!mounted || !resolvedTheme) {
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
