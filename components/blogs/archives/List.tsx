import { ContentType } from '../../../types/ContentType';
import React from 'react';
import Layout from '../../Layout';
import Head from 'next/head';
import { siteTitle } from '../../Layout';
import { Grid } from '@material-ui/core';
import { Today } from '@material-ui/icons';
import Date from '../../Date';
import Link from 'next/link';
import utilStyles from '../../../styles/utils.module.css';

type Props = {
  contents: Array<ContentType>;
};

const List: React.FC<Props> = ({ contents }: Props) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        {contents.map((content: ContentType) => (
          <React.Fragment key={content.id}>
            <Grid container className={utilStyles.lightText} alignContent="center">
              <Today></Today>
              <Date dateString={content.publishedAt} />
            </Grid>
            <Link href="/blogs/[id]" as={`blogs/${content.id}`}>
              <a>
                <h2>{content.title}</h2>
              </a>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
};

export default List;
