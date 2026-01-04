import { expect, within } from 'storybook/test';

import { MdxContent } from '.';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { serializeBlogMdx } from '~/lib/serializeBlogMdx';

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
  title: 'MdxContent',
  component: MdxContent,
  args: {
    // placeholder; actual source is provided via loaders
    source: {} as never,
  },
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'light' },
  },
} satisfies Meta<typeof MdxContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  loaders: [
    async () => ({
      source: await serializeBlogMdx(sampleMdx),
    }),
  ],
  render: (_, { loaded }) => {
    const source = loaded.source;
    return <MdxContent source={source} />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('本文を表示する', async () => {
      const body = await canvas.findByText('MDX を Storybook でプレビューする例です。');
      await expect(body).toBeInTheDocument();
    });
  },
};

export const ErrorState: Story = {
  render: () => {
    const source = {
      error: new Error('MDX compile error'),
      frontmatter: {},
      scope: {},
    };
    return <MdxContent source={source} />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('エラーメッセージを表示する', async () => {
      const message = canvas.getByRole('alert');
      await expect(message).toHaveTextContent('この記事の本文を表示できませんでした。');
    });
  },
};
