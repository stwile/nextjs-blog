import { expect, userEvent, within } from 'storybook/test';

import { Pagination } from '.';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Pagination',
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalCount: 300,
    currentPage: 2,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('要素があること', async () => {
      const pagination = canvas.getByRole('list', {
        name: 'ページネーションのリスト',
      });
      await expect(pagination).toBeInTheDocument();

      const navigation = canvas.getByRole('navigation', {
        name: 'ページネーション',
      });
      await expect(navigation).toContainElement(pagination);

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

      const currentPageLink = canvas.getByRole('link', { name: '2' });
      await expect(currentPageLink).toHaveAttribute('aria-current', 'page');
      await expect(link).not.toHaveAttribute('aria-current');
    });
  },
};

export const Hover: Story = {
  args: Default.args,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: '2' });

    await step('hover状態を再現する', async () => {
      await userEvent.hover(link);
      await expect(link).toBeInTheDocument();
    });
  },
};

export const FocusVisible: Story = {
  args: Default.args,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('キーボードフォーカス状態を再現する', async () => {
      await userEvent.tab();
      const focusedLink = canvas.getByRole('link', { name: '1' });
      await expect(focusedLink).toHaveFocus();
      await expect(focusedLink).toHaveClass('focus-visible:outline-gray-100');
    });
  },
};

export const DarkMode: Story = {
  args: Default.args,
  decorators: [
    (Story) => (
      <div className="dark p-4" style={{ backgroundColor: '#262727' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: '2' });

    await step('ダークテーマのhover状態を再現する', async () => {
      await userEvent.hover(link);
      await expect(link).toBeInTheDocument();
    });

    await step('ダークテーマのfocus-visible状態を再現する', async () => {
      await userEvent.tab();
      const focusedLink = canvas.getByRole('link', { name: '1' });
      await expect(focusedLink).toHaveFocus();
      await expect(focusedLink).toHaveClass('focus-visible:outline-gray-100');
    });
  },
};
