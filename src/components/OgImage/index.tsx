import type { JSX } from 'react';

import { truncateOgTitle } from '~/lib/og';

type Props = Readonly<{
  backgroundImageSrc: string;
  title: string;
}>;

export const OgImage = ({ backgroundImageSrc, title }: Props): JSX.Element => {
  const sliced = truncateOgTitle(title);
  // tailwindが使えないので、インラインスタイルで指定
  return (
    <div
      lang="ja-JP"
      style={{
        backgroundColor: '#fff',
        backgroundSize: '100% 100%',
        height: '100%',
        width: '100%',
        display: 'flex',
        textAlign: 'left',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        backgroundImage: `url(${backgroundImageSrc})`,
      }}
    >
      {/* テキスト部分 */}
      <div
        style={{
          width: '85%',
          margin: 'auto',
          fontSize: 70,
          fontFamily: 'Noto Sans JP',
          fontWeight: 700,
          letterSpacing: '-0.025em',
          color: '#fff',
          lineHeight: 1.3,
          whiteSpace: 'pre-wrap',
        }}
      >
        {sliced}
      </div>
    </div>
  );
};
