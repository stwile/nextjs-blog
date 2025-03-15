import { Slide } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Slide',
  component: Slide,
} satisfies Meta<typeof Slide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slideId: process.env.NEXT_PUBLIC_SB_SLIDE_ID ?? '',
  },
  tags: ['skip-test'],
};
