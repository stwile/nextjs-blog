import { expect, within } from 'storybook/test';

import { BlogArticle } from '.';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ContentType } from '~/types/response/blog/ContentType';

const sampleContent: ContentType = {
  id: 'sample-id',
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
  publishedAt: '2025-01-01T00:00:00.000Z',
  revisedAt: '2025-01-01T00:00:00.000Z',
  title: 'Storybookで見るMDX記事',
  description: 'MDXをStorybook上でプレビューするためのサンプルです。',
  body: '',
  tags: [],
};

const meta = {
  title: 'BlogArticle',
  component: BlogArticle,
  args: {
    content: sampleContent,
    children: <p>MDX を Storybook でプレビューする例です。</p>,
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
  },
} satisfies Meta<typeof BlogArticle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: sampleContent,
    children: (
      <>
        <h2>H2見出し</h2>
        <p>MDX を Storybook でプレビューする例です。</p>
        <ul>
          <li>GFM 対応でリストやテーブルを扱える</li>
        </ul>
      </>
    ),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    await step('要素がある', async () => {
      const title = canvas.getByRole('heading', { name: args.content.title });
      await expect(title).toBeInTheDocument();

      const date = canvas.getByRole('time');
      await expect(date).toHaveTextContent('2025/01/01');

      const body = await canvas.findByText('MDX を Storybook でプレビューする例です。');
      await expect(body).toBeInTheDocument();
    });
  },
};
