'use client';

import { MDXClient } from 'next-mdx-remote-client';

import type { SerializeResult } from 'next-mdx-remote-client/serialize';
import type { FC } from 'react';

import { CustomLink } from '~/components/CustomLink';
import { Docswell } from '~/components/Docswell';
import { InnerLink } from '~/components/InnerLink';
import { Podcast } from '~/components/Podcast';
import { SpeakerDeck } from '~/components/SpeakerDeck';
import { Twitter } from '~/components/Twitter';

const components = {
  a: CustomLink,
  Twitter,
  InnerLink,
  SpeakerDeck,
  Docswell,
  Podcast,
};

type Props = {
  source: SerializeResult;
};

const MdxContent: FC<Props> = ({ source }: Props) => {
  const hasCompiledSource = 'compiledSource' in source;

  if (!hasCompiledSource) {
    return (
      <div className="prose" role="alert">
        この記事の本文を表示できませんでした。
      </div>
    );
  }

  return (
    <div className="prose">
      <MDXClient {...source} components={components} />
    </div>
  );
};

export { MdxContent };
