import { useTheme } from 'next-themes';
import React from 'react';
import { TwitterTweetEmbed as Tweet } from 'react-twitter-embed';

type Props = {
  tweetId: string;
};

export const Twitter: React.FC<Props> = ({ tweetId }) => {
  const { theme } = useTheme();
  return <Tweet tweetId={tweetId} options={{ theme }} />;
};
