import path from 'node:path';
import { fileURLToPath } from 'url';

import { playwright } from '@vitest/browser-playwright';
import storybookTest from '@storybook/addon-vitest/vitest-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, defineProject } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: 'json',
    },
    globals: true,
    projects: [
      defineProject({
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            storybookScript: 'pnpm storybook --ci',
            storybookUrl: process.env.SB_URL,
            tags: {
              exclude: ['skip-test'],
            },
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      }),
    ],
  },
});
