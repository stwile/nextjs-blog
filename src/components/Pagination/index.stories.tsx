import { expect, within } from '@storybook/test';

import { Pagination } from '.';

import type { Meta, StoryObj } from '@storybook/react/*';

const meta = {
  title: 'Pagination',
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalCount: 300,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('要素があること', async () => {
      const pagination = canvas.getByRole('list', {
        name: 'ページネーションのリスト',
      });
      await expect(pagination).toBeInTheDocument();

      const listItems = canvas.getAllByRole('listitem', {
        name: 'ページネーションのリストアイテム',
      });
      await expect(listItems).toHaveLength(30);

      const listItem = listItems[0];
      if (!listItem) {
        throw new Error('listItem is not found');
      }

      const link = within(listItem).getByRole('link', {
        name: '1',
      });
      await expect(link).toHaveAttribute('href', '/blog/page/1');
      await expect(link).not.toHaveAttribute('target', '_blank');
      await expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
    });
  },
};
