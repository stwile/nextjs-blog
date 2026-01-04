import rehypeShiki from '@shikijs/rehype';
import { serialize } from 'next-mdx-remote-client/serialize';
import remarkGfm from 'remark-gfm';

import type { SerializeResult } from 'next-mdx-remote-client/serialize';

/**
 * Serializes blog MDX content for use with `next-mdx-remote-client`, applying
 * syntax highlighting and GitHub Flavored Markdown (GFM) support.
 *
 * Uses `rehypeShiki` with the `plastic` theme to highlight code blocks,
 * and `remark-gfm` to enable GFM features such as tables, task lists,
 * and strikethrough.
 *
 * @param body - Raw MDX string representing the blog post content.
 * @returns A serialized MDX result that can be rendered by `next-mdx-remote-client`.
 */
export const serializeBlogMdx = async (body: string): Promise<SerializeResult> => {
  return serialize({
    source: body,
    options: {
      mdxOptions: {
        rehypePlugins: [[rehypeShiki, { theme: 'plastic' }]],
        remarkPlugins: [[remarkGfm]],
      },
    },
  });
};
