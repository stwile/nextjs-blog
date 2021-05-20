import { TagType } from './TagType';

export type ContentType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
  tags: Array<TagType>;
  description?: string;
};
