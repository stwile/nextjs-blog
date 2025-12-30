import rehypeShiki from '@shikijs/rehype';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export const serializeBlogMdx = async (body: string): Promise<MDXRemoteSerializeResult> => {
  return serialize(body, {
    mdxOptions: {
      rehypePlugins: [[rehypeShiki, { theme: 'plastic' }]],
      remarkPlugins: [[remarkGfm]],
    },
  });
};
