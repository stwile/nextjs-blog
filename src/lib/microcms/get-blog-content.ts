import type { ContentType } from '~/types/response/blog/ContentType';

import { BlogNotFoundError } from './blog-not-found-error';
import { client } from './client';

const MICROCMS_NOT_FOUND_PATTERN = /^fetch API response status: 404(?:\n|$)/;

export const getBlogContent = async (id: string): Promise<ContentType> => {
  try {
    return await client.get<ContentType>({
      endpoint: 'blog',
      contentId: id,
    });
  } catch (error) {
    if (error instanceof Error && MICROCMS_NOT_FOUND_PATTERN.test(error.message)) {
      throw new BlogNotFoundError(id, { cause: error });
    }

    throw error;
  }
};
