export type BlogSummary = Readonly<{
  id: string;
  publishedAt: string;
  title: string;
  description: string;
}>;

export type BlogPost = BlogSummary &
  Readonly<{
    body: string;
  }>;

export type BlogList = Readonly<{
  items: ReadonlyArray<BlogSummary>;
  totalCount: number;
}>;
