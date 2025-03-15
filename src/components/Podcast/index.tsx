import { type FC } from 'react';

type Props = {
  podcastId: string;
};

export const Podcast: FC<Props> = ({ podcastId }) => {
  return (
    <div style={{ margin: '20px 0' }}>
      <iframe
        src={`https://open.spotify.com/embed/episode/${podcastId}`}
        title="podcast"
        style={{ width: '100%' }}
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
};
