import Link from 'next/link'
import React from 'react'
import { GetStaticProps } from 'next'
import { Content } from '../types/content';
import { Tag } from '../types/tag';
import Layout, {siteTitle} from '../components/layout';
import Head from 'next/head';
import { List } from '../types/response/blog/list';

const Home = ({
  contents
}: {
  contents: Array<Content>
}) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        {contents.map((content: Content) => (
          <React.Fragment key={content.id}>
            <Link href="/blogs/[id]" as={`blogs/${content.id}`}>
              <a>
                <h2>{content.title}</h2>
              </a>
            </Link>
            {content.tags.map((tag: Tag) => (
              <React.Fragment key={tag.id}>
                <span>{tag.name}</span>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const key: string = process.env.API_KEY!;
  const headers = {
    headers: {
      'X-API-KEY': key,
    },
  };
  const url = `${process.env.ENDPOINT}/blog`;
  const res = await fetch(url, headers);
  const data: List = await res.json();

  return {
    props: {
      contents: data.contents,
    }
  }
}

export default Home;