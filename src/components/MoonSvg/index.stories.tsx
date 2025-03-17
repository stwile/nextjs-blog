import { expect } from '@storybook/test';

import { MoonSvg } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MoonSvg',
  component: MoonSvg,
} satisfies Meta<typeof MoonSvg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    isDark: false,
  },
  play: async ({ canvasElement, step }) => {
    await step('要素があること', async () => {
      // SVG要素を正しく取得する方法
      const svg = canvasElement.querySelector('svg');
      await expect(svg).toBeInTheDocument();

      // Lightモードでは黒色 (#000) になるはず
      await expect(svg).toHaveAttribute('fill', '#000');
      await expect(svg).toHaveAttribute('stroke', '#000');
    });
  },
};

export const Dark: Story = {
  args: {
    isDark: true,
  },
  play: async ({ canvasElement, step }) => {
    await step('要素があること', async () => {
      // SVG要素を正しく取得する方法
      const svg = canvasElement.querySelector('svg');
      await expect(svg).toBeInTheDocument();

      // Darkモードでは白色 (#fff) になるはず
      await expect(svg).toHaveAttribute('fill', '#fff');
      await expect(svg).toHaveAttribute('stroke', '#fff');
    });
  },
};
