import { storybookNextJsPlugin } from '@storybook/experimental-nextjs-vite/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), storybookNextJsPlugin()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: 'json',
    },
    globals: true,
  },
});
