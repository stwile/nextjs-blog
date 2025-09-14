import { expect, within } from 'storybook/test';

import { Date } from '.';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Date',
  component: Date,
} satisfies Meta<typeof Date>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dateString: '2025-03-15',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('要素がある', async () => {
      const date = canvas.getByRole('time');
      await expect(date).toBeInTheDocument();
      await expect(date).toHaveTextContent('2025/03/15');
    });
  },
};
