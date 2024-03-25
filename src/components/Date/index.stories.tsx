import { Date } from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Date,
  args: {
    dateString: '2022-01-01',
  },
} satisfies Meta<typeof Date>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
