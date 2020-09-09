import { ContentType } from './ContentType';

export type ListType = {
  contents: Array<ContentType>;
  totalCount: number;
  offset: number;
  limit: number;
};
