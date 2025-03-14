import { Slide } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'SpeakerDeck',
  component: Slide,
} satisfies Meta<typeof Slide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slideId: '2fcaa73e37ba42f38c3606cba7861bf2',
  },
};
