import { Twitter } from '.';

import type { Meta, StoryObj } from '@storybook/react/*';

const meta = {
  title: 'Twitter',
  component: Twitter,
} satisfies Meta<typeof Twitter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tweetId: process.env.NEXT_PUBLIC_SB_TWEET_ID ?? '',
  },
  tags: ['skip-test'],
};
