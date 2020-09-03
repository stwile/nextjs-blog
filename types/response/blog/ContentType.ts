import { TagType } from './TagType';

export type ContentType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  body: string;
  tags: Array<TagType>;
};
