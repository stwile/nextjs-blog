import { makeStyles, Theme } from '@material-ui/core';
import utilStyles from '../styles/utils.module.css';
import { Content } from '../types/content';
import Date from './date';
import React from 'react';
import CategoryChipMapper from './CategoryChip/CategoryChipMapper';
import { Tag } from '../types/tag';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'right',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

type Props = {
  content: Content;
}

const Article: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  return (
    <article>
      <div className={utilStyles.lightText}>
        <Date dateString={props.content.publishedAt} />
      </div>
      <h1 className={utilStyles.headingXl}>{props.content.title}</h1>
      <div>
        <div className={classes.root}>
          {props.content.tags.map((tag: Tag) => (
            <React.Fragment key={tag.id}>
              {CategoryChipMapper(tag)}
            </React.Fragment>
          ))}
        </div>
      </div>
      <ReactMarkdown source={props.content.body} skipHtml={true} />
    </article>
  );
}

export default Article;