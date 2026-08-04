type Props = Readonly<{
  slideId: string;
}>;

const Docswell = ({ slideId }: Props) => {
  const slideUrl = `https://www.docswell.com/slide/${slideId}/embed`;

  const containerStyle = {
    display: 'block',
    width: '100%',
    margin: '1.5rem 0',
    paddingBottom: 'calc(56.25% + 38px)',
    position: 'relative' as const,
    height: 0,
  } as const;

  const iframeStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
  } as const;

  return (
    <span style={containerStyle}>
      <iframe
        title="docswell"
        src={slideUrl}
        allowFullScreen={true}
        style={iframeStyle}
        loading="lazy"
      />
    </span>
  );
};

export { Docswell };
