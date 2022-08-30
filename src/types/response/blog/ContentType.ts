import type { TagType } from './TagType';

export type ContentType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  body: string;
  tags: TagType[];
  revisedAt: string;
  description: string;
};
