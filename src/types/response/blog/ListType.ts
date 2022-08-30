import type { ContentType } from './ContentType';

export type ListType = {
  contents: ContentType[];
  totalCount: number;
  offset: number;
  limit: number;
};
