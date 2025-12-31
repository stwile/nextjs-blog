import { MDXRemote } from 'next-mdx-remote';

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
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
  source: MDXRemoteSerializeResult;
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

  return (
    <Layout meta={meta}>
      <article>
        <p className="text-sm">
          <Date dateString={content.publishedAt} />
        </p>
        <h1 className="mb-11">{content.title}</h1>
        <div className="prose">
          <MDXRemote {...source} components={components} />
        </div>
      </article>
    </Layout>
  );
};
