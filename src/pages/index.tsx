import type { GetStaticProps } from 'next';
import type { ComponentProps, JSX } from 'react';
import type { ListType } from '~/types/response/blog/ListType';

import { BlogLayout } from '~/components/BlogLayout';
import { PER_PAGE } from '~/components/Pagination';
import { client } from '~/lib/microcms';

type Props = ComponentProps<typeof BlogLayout>;

const Index = ({ contents, totalCount }: Props): JSX.Element => {
  return <BlogLayout contents={contents} totalCount={totalCount} />;
};

export const getStaticProps = (async () => {
  const data: ListType = await client.get({
    endpoint: 'blog',
    queries: { offset: 0, limit: PER_PAGE },
  });
  return {
    props: {
      contents: data.contents,
      totalCount: data.totalCount,
    },
  };
}) satisfies GetStaticProps<Props>;

export default Index;
