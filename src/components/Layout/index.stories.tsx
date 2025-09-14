import { expect, within } from '@storybook/test';

import { Layout } from '.';

import type { Meta, StoryObj } from '@storybook/react/*';

import { MetaType } from '~/types/blog/MetaType';

const meta = {
  title: 'Layout',
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

const MOCK_META = {
  title: 'Layout',
  description: 'Layout',
  image: 'Layout',
  type: 'blog',
} satisfies MetaType;

export const Default: Story = {
  args: {
    children: '2025/03/15 15:32',
    meta: MOCK_META,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('要素がある', async () => {
      const header = canvas.getByRole('banner');
      await expect(header).toBeInTheDocument();

      const main = canvas.getByRole('main');
      await expect(main).toBeInTheDocument();

      const content = within(main);
      const children = content.getByText('2025/03/15 15:32');
      await expect(children).toBeInTheDocument();

      const footer = canvas.getByRole('contentinfo');
      await expect(footer).toBeInTheDocument();
    });
  },
};
