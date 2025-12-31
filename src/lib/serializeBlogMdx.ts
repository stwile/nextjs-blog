import rehypeShiki from '@shikijs/rehype';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

/**
 * Serializes blog MDX content for use with `next-mdx-remote`, applying
 * syntax highlighting and GitHub Flavored Markdown (GFM) support.
 *
 * Uses `rehypeShiki` with the `plastic` theme to highlight code blocks,
 * and `remark-gfm` to enable GFM features such as tables, task lists,
 * and strikethrough.
 *
 * @param body - Raw MDX string representing the blog post content.
 * @returns A serialized MDX result that can be rendered by `next-mdx-remote`.
 */
export const serializeBlogMdx = async (body: string): Promise<MDXRemoteSerializeResult> => {
  return serialize(body, {
    mdxOptions: {
      rehypePlugins: [[rehypeShiki, { theme: 'plastic' }]],
      remarkPlugins: [[remarkGfm]],
    },
  });
};
