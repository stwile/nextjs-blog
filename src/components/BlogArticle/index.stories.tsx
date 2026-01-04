import { expect, within } from 'storybook/test';

import { BlogArticle } from '.';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ContentType } from '~/types/response/blog/ContentType';

import { serializeBlogMdx } from '~/lib/serializeBlogMdx';

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

const sampleMdx = `
# H1見出し

## H2見出し

### H3見出し

#### H4見出し

MDX を Storybook でプレビューする例です。

- シンタックスハイライト用のプラグインを設定
- GFM 対応でリストやテーブルを扱える

コードブロック例:

\`\`\`ts
const greet = (name: string) => \`Hello \${name}\`;
console.log(greet('Storybook'));
\`\`\`

リンク例: [内部リンク](/) / [外部リンク](https://example.com)
`;

const meta = {
  title: 'BlogArticle',
  component: BlogArticle,
  args: {
    content: sampleContent,
    // placeholder; actual source is provided via loaders
    source: {} as never,
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
  },
  loaders: [
    async () => ({
      source: await serializeBlogMdx(sampleMdx),
    }),
  ],
  render: ({ content }, { loaded }) => {
    const source = loaded.source;
    return <BlogArticle content={content} source={source} />;
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

export const ErrorState: Story = {
  args: {
    content: sampleContent,
  },
  render: ({ content }) => {
    const source = {
      error: new Error('MDX compile error'),
      frontmatter: {},
      scope: {},
    };
    return <BlogArticle content={content} source={source} />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('エラーメッセージを表示する', async () => {
      const message = canvas.getByRole('alert');
      await expect(message).toHaveTextContent('この記事の本文を表示できませんでした。');
    });
  },
};
