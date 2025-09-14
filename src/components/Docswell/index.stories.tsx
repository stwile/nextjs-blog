import { Docswell } from '.';

import type { Meta, StoryObj } from '@storybook/react/*';

const meta = {
  title: 'Docswell',
  component: Docswell,
} satisfies Meta<typeof Docswell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slideId: process.env.NEXT_PUBLIC_SB_DOCSWELL_ID ?? '',
  },
  tags: ['skip-test'],
};
