import { Podcast } from '.';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Podcast',
  component: Podcast,
} satisfies Meta<typeof Podcast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    podcastId: process.env.NEXT_PUBLIC_SB_PODCAST_ID ?? '',
  },
  tags: ['skip-test'],
};
