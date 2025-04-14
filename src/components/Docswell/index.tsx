import Script from 'next/script';

import type { FC } from 'react';

type Props = {
  slideId: string;
};

export const Docswell: FC<Props> = ({ slideId }) => {
  const SLIDE_CLASS_NAME = 'docswell-embed';
  const URL = 'https://www.docswell.com';
  return (
    <>
      <Script
        async
        className={SLIDE_CLASS_NAME}
        src={`${URL}/assets/libs/docswell-embed/docswell-embed.min.js`}
        data-src={`${URL}/slide/${slideId}/embed`}
        data-aspect="0.5625"
        strategy="lazyOnload"
      />
    </>
  );
};
