import { ContentType } from '../response/blog/ContentType';

export type ListType = {
  contents: Array<ContentType>;
  totalCount: number;
  offset: number;
  limit: number;
};
