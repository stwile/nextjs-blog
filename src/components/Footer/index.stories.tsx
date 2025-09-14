import { expect, within } from 'storybook/test';

import { Footer } from '.';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('要素がある', async () => {
      const footer = canvas.getByRole('contentinfo');
      await expect(footer).toBeInTheDocument();
    });
  },
};
