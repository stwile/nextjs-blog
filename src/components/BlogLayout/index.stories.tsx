import { expect, within } from '@storybook/test';

import { BlogLayout } from '.';

import type { Meta, StoryObj } from '@storybook/react';

import { ContentType } from '~/types/response/blog/ContentType';

const meta = {
  title: 'BlogLayout',
  component: BlogLayout,
} satisfies Meta<typeof BlogLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const MOCK_CONTENTS = [
  {
    id: '1',
    title: 'First Blog Post',
    description: 'This is the description for the first blog post.',
    publishedAt: '2025-03-01',
    createdAt: '2025-02-28T12:00:00Z',
    updatedAt: '2025-03-01T08:00:00Z',
    body: '<p>This is the body content of the first blog post.</p>',
    tags: [],
    revisedAt: '2025-03-01T09:00:00Z',
  },
  {
    id: '2',
    title: 'Second Blog Post',
    description: 'This is the description for the second blog post.',
    publishedAt: '2025-03-10',
    createdAt: '2025-03-08T10:00:00Z',
    updatedAt: '2025-03-09T14:00:00Z',
    body: '<p>This is the body content of the second blog post.</p>',
    tags: [],
    revisedAt: '2025-03-09T15:00:00Z',
  },
] satisfies ContentType[];

export const Default: Story = {
  args: {
    contents: MOCK_CONTENTS,
    totalCount: 2,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('要素がある', async () => {
      await step('記事がある', async () => {
        const articles = canvas.getAllByRole('article');
        await expect(articles).toHaveLength(2);

        const [article1, article2] = articles;
        if (!article1 || !article2) {
          throw new Error('article is not found');
        }

        const firstArticle = within(article1).getByRole('link', {
          name: 'First Blog Post',
        });
        await expect(firstArticle).toBeInTheDocument();
        await expect(firstArticle).toHaveAttribute('href', '/blog/1');

        const secondArticle = within(article2).getByRole('link', {
          name: 'Second Blog Post',
        });
        await expect(secondArticle).toBeInTheDocument();
        await expect(secondArticle).toHaveAttribute('href', '/blog/2');
      });
    });
  },
};
