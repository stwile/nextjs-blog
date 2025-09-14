import { expect, within } from '@storybook/test';

import { Header } from '.';

import type { Meta, StoryObj } from '@storybook/react/*';

const meta = {
  title: 'Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('要素がある', async () => {
      const header = canvas.getByRole('banner');
      await expect(header).toBeInTheDocument();

      const navigation = canvas.getByRole('navigation', {
        name: 'ヘッダーのナビゲーション',
      });
      await expect(navigation).toBeInTheDocument();

      const list = canvas.getByRole('list', {
        name: 'ヘッダーのリスト',
      });
      await expect(list).toBeInTheDocument();

      const link = canvas.getByRole('link', {
        name: 'Home',
      });
      await expect(link).toHaveAttribute('href', '/');
      await expect(link).not.toHaveAttribute('target', '_blank');
      await expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');

      const toggleButton = canvas.getByRole('button');
      await expect(toggleButton).toBeInTheDocument();
    });
  },
};
