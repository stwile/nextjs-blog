type Props = Readonly<{
  podcastId: string;
}>;

const Podcast = ({ podcastId }: Props) => {
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

export { Podcast };
