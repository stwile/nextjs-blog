import type { ReactNode } from 'react';
import type { ContentType } from '~/types/response/blog/ContentType';

import { Date } from '~/components/Date';

type Props = Readonly<{
  children: ReactNode;
  content: ContentType;
}>;

const BlogArticle = ({ children, content }: Props) => {
  return (
    <article>
      <p className="text-sm">
        <Date dateString={content.publishedAt} />
      </p>
      <h1 className="mb-11">{content.title}</h1>
      <div className="prose">{children}</div>
    </article>
  );
};

export { BlogArticle };
