import { expect, within } from 'storybook/test';

import { DOMAIN_NAME } from '../Meta';

import { CustomLink } from '.';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'CustomLink',
  component: CustomLink,
} satisfies Meta<typeof CustomLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InternalLinkByFullPath: Story = {
  args: {
    href: `https://${DOMAIN_NAME}/index`,
    children: 'InternalLinkByFullPath',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', {
      name: 'InternalLinkByFullPath',
    });

    await expect(link).not.toHaveAttribute('target', '_blank');
    await expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
    await expect(link).toHaveAttribute('href', '/index');
  },
};

export const InternalLinkByRelativePath: Story = {
  args: {
    href: `/index`,
    children: 'InternalLinkByRelativePath',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', {
      name: 'InternalLinkByRelativePath',
    });

    await expect(link).not.toHaveAttribute('target', '_blank');
    await expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
    await expect(link).toHaveAttribute('href', '/index');
  },
};

export const ExternalLink: Story = {
  args: {
    href: 'https://hogehoge.com',
    children: 'ExternalLink',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', {
      name: 'ExternalLink',
    });

    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(link).toHaveAttribute('href', args.href);
  },
};
