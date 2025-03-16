import { expect, within } from '@storybook/test';

import { Navigation } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Navigation',
  component: Navigation,
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navigation = canvas.getByRole('navigation', {
      name: 'メイン',
    });
    await expect(navigation).toBeInTheDocument();

    const list = canvas.getByRole('list', {
      name: 'メインのリスト',
    });
    await expect(list).toBeInTheDocument();

    const link = canvas.getByRole('link', {
      name: 'Home',
    });
    await expect(link).toHaveAttribute('href', '/');
    await expect(link).not.toHaveAttribute('target', '_blank');
    await expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
  },
};
