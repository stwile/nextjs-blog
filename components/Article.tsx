import utilStyles from '../styles/utils.module.css';
import { Content } from '../types/content';
import Date from './date';
import React from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  content: Content;
}

const Article: React.FC<Props> = (props: Props) => {
  const { content } = props;
  return (
    <article>
      <div className={utilStyles.lightText}>
        <Date dateString={content.publishedAt} />
      </div>
      <h1
        className={utilStyles.headingXl}
      >
      {content.title}</h1>
      <ReactMarkdown
        source={content.body}
        skipHtml={true}
      />
    </article>
  );
}

export default Article;