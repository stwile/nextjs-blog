import { Tag } from './tag';

export type Content = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  body: string;
  tags: Array<Tag>
}