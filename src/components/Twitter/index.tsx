import { Tweet } from 'react-tweet';

type Props = Readonly<{
  tweetId: string;
}>;

const Twitter = ({ tweetId }: Props) => {
  return <Tweet id={tweetId} />;
};

export { Twitter };
