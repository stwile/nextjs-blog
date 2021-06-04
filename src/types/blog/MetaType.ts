export type MetaType = {
  title: string;
  description: string;
  image: string;
  type: OpenGraphType;
};

type OpenGraphType = 'blog' | 'article;';
