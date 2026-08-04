import type { TagType } from './TagType';

export type ContentType = Readonly<{
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  body: string;
  tags: ReadonlyArray<TagType>;
  revisedAt: string;
  description: string;
}>;
