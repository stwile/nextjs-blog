import { useTheme } from 'next-themes';
import { TwitterTweetEmbed as Tweet } from 'react-twitter-embed';

import type { FC } from 'react';

type Props = {
  tweetId: string;
};

export const Twitter: FC<Props> = ({ tweetId }) => {
  const { theme } = useTheme();
  return <Tweet tweetId={tweetId} options={{ theme }} />;
};
