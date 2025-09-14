import { within, expect, userEvent } from 'storybook/test';

import { ThemeProvider } from '../ThemeProvider';

import { ThemeSwitch } from '.';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'ThemeSwitch',
  component: ThemeSwitch,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('初期状態', async () => {
      await step('要素があること', async () => {
        const toggle = canvas.getByRole('button', {
          name: 'Toggle Dark Mode',
        });
        await expect(toggle).toBeInTheDocument();

        const svg = canvas.getByTitle('Light And Dark Switch Toggle');
        await expect(svg).toBeInTheDocument();
      });

      await step('色のチェック', async () => {
        await step('背景色が白いこと', async () => {
          const backgroundColor = window.getComputedStyle(canvasElement).backgroundColor;
          await expect(backgroundColor).toBe('rgba(0, 0, 0, 0)'); // 例: Tailwindの `bg-gray-900`
        });
        await step('SVGの色が黒いこと', async () => {
          const svg = canvasElement.querySelector('svg');
          await expect(svg).toBeInTheDocument();
          await expect(svg).toHaveAttribute('fill', '#000');
          await expect(svg).toHaveAttribute('stroke', '#000');
        });
      });
    });

    await step('色を変える', async () => {
      const toggle = canvas.getByRole('button', {
        name: 'Toggle Dark Mode',
      });
      await userEvent.click(toggle);

      await step('色のチェック', async () => {
        await step('背景が黒いこと', async () => {
          const backgroundColor = window.getComputedStyle(canvasElement).backgroundColor;
          await expect(backgroundColor).toBe('rgb(38, 39, 39)'); // 例: Tailwindの `bg-gray-900`
        });
        await step('SVGの色が黒いこと', async () => {
          const svg = canvasElement.querySelector('svg');
          await expect(svg).toBeInTheDocument();
          await expect(svg).toHaveAttribute('fill', '#fff');
          await expect(svg).toHaveAttribute('stroke', '#fff');
        });
      });
    });
  },
};
