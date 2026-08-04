import type { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk';

import type { BlogPost, BlogSummary } from './types';

export type MicroCmsBlogFields = Readonly<{
  title: string;
  body: string;
  description: string;
}>;

type MicroCmsBlogContent = MicroCmsBlogFields & MicroCMSContentId & MicroCMSDate;

const getPublishedAt = (response: MicroCmsBlogContent): string => {
  if (response.publishedAt === undefined) {
    throw new Error('Blog content must be published');
  }

  return response.publishedAt;
};

export const toBlogPost = (response: MicroCmsBlogContent): BlogPost => ({
  id: response.id,
  publishedAt: getPublishedAt(response),
  title: response.title,
  body: response.body,
  description: response.description,
});

export const toBlogSummary = (response: MicroCmsBlogContent): BlogSummary => ({
  id: response.id,
  publishedAt: getPublishedAt(response),
  title: response.title,
  description: response.description,
});
