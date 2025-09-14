import { SpeakerDeck } from '.';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'SpeakerDeck',
  component: SpeakerDeck,
} satisfies Meta<typeof SpeakerDeck>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slideId: process.env.NEXT_PUBLIC_SB_SLIDE_ID ?? '',
  },
  tags: ['skip-test'],
};
