import { type Preview } from '@storybook/nextjs-vite';
import '../styles/global.css';
import { ThemeProvider } from 'next-themes';
import { createElement } from 'react';

const preview: Preview = {
  decorators: [
    (Story) =>
      createElement(
        ThemeProvider,
        { attribute: 'class', defaultTheme: 'light', enableSystem: true },
        createElement(Story),
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
    },
  },
};

export default preview;
