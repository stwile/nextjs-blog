import { Content } from '../../content';

export type List = {
  contents: Array<Content>;
  totalCount: number;
  offset: number;
  limit: number;
};
