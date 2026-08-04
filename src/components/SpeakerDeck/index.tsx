import Script from 'next/script';

type Props = Readonly<{
  slideId: string;
}>;

const SpeakerDeck = ({ slideId }: Props) => {
  const SLIDE_CLASS_NAME = 'speakerdeck-embed';
  return (
    <>
      {/* 直接スクリプトを埋め込む */}
      <Script src="//speakerdeck.com/assets/embed.js" strategy="lazyOnload" />

      {/* Speaker Deck の埋め込み要素 */}
      <div className={SLIDE_CLASS_NAME} data-id={slideId} data-ratio="1.777" />
    </>
  );
};

export { SpeakerDeck };
