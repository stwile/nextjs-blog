import 'server-only';

import type { BlogList, BlogPost } from '../types';

import { BlogNotFoundError } from '../blog-not-found-error';
import { toBlogPost, toBlogSummary } from '../mapper';
import { client } from '~/lib/microcms/client';

import type { MicroCmsBlogFields } from '../mapper';

type BlogListParams = Readonly<{
  page: number;
  perPage: number;
}>;

const MICROCMS_NOT_FOUND_PATTERN = /^fetch API response status: 404(?:\n|$)/;

const isMicroCmsNotFoundError = (error: unknown): boolean =>
  error instanceof Error && MICROCMS_NOT_FOUND_PATTERN.test(error.message);

const createFetchError = (cause: unknown): Error =>
  new Error('Failed to fetch blog content', { cause });

export const getBlogById = async (id: string): Promise<BlogPost> => {
  try {
    const response = await client.getListDetail<MicroCmsBlogFields>({
      endpoint: 'blog',
      contentId: id,
    });

    return toBlogPost(response);
  } catch (error) {
    if (isMicroCmsNotFoundError(error)) {
      throw new BlogNotFoundError(id, { cause: error });
    }

    throw createFetchError(error);
  }
};

export const getBlogList = async ({ page, perPage }: BlogListParams): Promise<BlogList> => {
  try {
    const response = await client.getList<MicroCmsBlogFields>({
      endpoint: 'blog',
      queries: {
        offset: (page - 1) * perPage,
        limit: perPage,
      },
    });

    return {
      items: response.contents.map(toBlogSummary),
      totalCount: response.totalCount,
    };
  } catch (error) {
    throw createFetchError(error);
  }
};

export const getAllBlogIds = async (): Promise<string[]> => {
  try {
    return await client.getAllContentIds({ endpoint: 'blog' });
  } catch (error) {
    throw createFetchError(error);
  }
};
