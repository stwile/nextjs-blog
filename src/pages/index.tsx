import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import { ContentType } from '../../types/response/blog/ContentType';
import { getAllContents } from '../apis/blog';
import Date from '../components/Date';
import { Layout, siteTitle } from '../components/Layout';

type Props = {
  contents: ContentType[];
};

const Index = ({ contents }: Props): JSX.Element => {
  return (
    <Layout>
      <h1>{siteTitle}</h1>
      {contents.map((content: ContentType) => (
        <article key={content.id} className="mt-12">
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            <Date dateString={content.publishedAt} />
          </p>
          <h1 className="mb-2 text-xl">
            <Link as={`/blog/${content.id}`} href={'/blog/[id]'}>
              <a className="text-gray-900 dark:text-white dark:hover:text-blue-400">
                {content.title}
              </a>
            </Link>
          </h1>
          <p className="mb-3">{content.description}</p>
          <p>
            <Link as={`/blog/${content.id}`} href={'/blog/[id]'}>
              <a>Read More</a>
            </Link>
          </p>
        </article>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contents = await getAllContents();
  return {
    props: {
      contents,
    },
  };
};

export default Index;
