import { expect, within } from '@storybook/test';

import { Header } from '.';

import type { Meta, StoryObj } from '@storybook/react';

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

      const nav = canvas.getByRole('navigation');
      await expect(nav).toBeInTheDocument();

      const toggleButton = canvas.getByRole('button');
      await expect(toggleButton).toBeInTheDocument();
    });
  },
};
