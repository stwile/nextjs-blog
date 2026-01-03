import { MDXClient } from 'next-mdx-remote-client';

import type { SerializeResult } from 'next-mdx-remote-client/serialize';
import type { FC } from 'react';
import type { MetaType } from '~/types/blog/MetaType';
import type { ContentType } from '~/types/response/blog/ContentType';

import { CustomLink } from '~/components/CustomLink';
import { Date } from '~/components/Date';
import { Docswell } from '~/components/Docswell';
import { InnerLink } from '~/components/InnerLink';
import { Layout } from '~/components/Layout';
import { DOMAIN_NAME, SITE_TITLE } from '~/components/Meta';
import { Podcast } from '~/components/Podcast';
import { SpeakerDeck } from '~/components/SpeakerDeck';
import { Twitter } from '~/components/Twitter';

type Props = {
  content: ContentType;
  source: SerializeResult;
};

const components = {
  a: CustomLink,
  Twitter,
  InnerLink,
  SpeakerDeck,
  Docswell,
  Podcast,
};

export const BlogArticle: FC<Props> = ({ content, source }: Props) => {
  const image = `https://${DOMAIN_NAME}/api/og?title=${content.title}`;

  const meta: MetaType = {
    title: `${content.title} | ${SITE_TITLE}`,
    description: content.description,
    type: 'article',
    image,
  };

  const compiled = 'compiledSource' in source;

  return (
    <Layout meta={meta}>
      <article>
        <p className="text-sm">
          <Date dateString={content.publishedAt} />
        </p>
        <h1 className="mb-11">{content.title}</h1>
        <div className="prose">
          {compiled ? (
            <MDXClient {...source} components={components} />
          ) : (
            <div role="alert">この記事の本文を表示できませんでした。</div>
          )}
        </div>
      </article>
    </Layout>
  );
};
