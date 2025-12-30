import { BlogArticle } from '.';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ContentType } from '~/types/response/blog/ContentType';

import { serializeBlogMdx } from '~/lib/serializeBlogMdx';

const sampleContent: ContentType = {
  id: 'sample-id',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  publishedAt: '2024-01-01T00:00:00.000Z',
  revisedAt: '2024-01-01T00:00:00.000Z',
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
};
