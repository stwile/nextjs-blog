import type { ContentType } from './ContentType';

export type ListType = Readonly<{
  contents: ReadonlyArray<ContentType>;
  totalCount: number;
  offset: number;
  limit: number;
}>;
