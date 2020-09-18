import utilStyles from '../../styles/utils.module.css';
import { ContentType } from '../../types/response/blog/ContentType';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Date from './Date';

type Props = {
  content: ContentType;
};

const Article: React.FC<Props> = ({ content }: Props) => {
  return (
    <article>
      <div className={utilStyles.lightText}>
        <Date dateString={content.publishedAt} />
      </div>
      <h1 className={utilStyles.headingXl}>{content.title}</h1>
      <ReactMarkdown source={content.body} skipHtml={true} />
    </article>
  );
};

export default Article;
