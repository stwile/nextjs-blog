import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: 'json',
    },
    globals: true,
  },
});
