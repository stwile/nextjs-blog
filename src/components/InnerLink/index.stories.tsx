import { expect, within } from '@storybook/test';

import { InnerLink } from '.';

import type { Meta, StoryObj } from '@storybook/react/*';

const meta = {
  title: 'InnerLink',
  component: InnerLink,
} satisfies Meta<typeof InnerLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    uri: '/index',
    title: 'Default',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', {
      name: args.title,
    });

    await expect(link).not.toHaveAttribute('target', '_blank');
    await expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
    await expect(link).toHaveAttribute('href', args.uri);
  },
};
