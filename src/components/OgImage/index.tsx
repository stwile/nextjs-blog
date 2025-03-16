import { DOMAIN_NAME } from '../Meta';

import type { JSX } from 'react';

type Props = {
  title: string;
};

export const OgImage = ({ title }: Props): JSX.Element => {
  const IMAGE_URL = `https://${DOMAIN_NAME}/images/og_base.png`;
  const sliced = title.slice(0, 50);
  // tailwindが使えないので、インラインスタイルで指定
  return (
    <div
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
        backgroundImage: `url(${IMAGE_URL})`,
      }}
    >
      {/* テキスト部分 */}
      <div
        style={{
          width: '85%',
          margin: 'auto',
          fontSize: 70,
          fontStyle: 'bold',
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
