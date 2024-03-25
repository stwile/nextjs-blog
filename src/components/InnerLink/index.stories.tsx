import { expect, within } from '@storybook/test';

import { InnerLink } from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: InnerLink,
  args: {
    uri: 'https://example.com',
    title: 'Example',
  },
} satisfies Meta<typeof InnerLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link', {
      name: args.title,
    });

    await expect(link).toHaveAttribute('href', args.uri);
  },
};
