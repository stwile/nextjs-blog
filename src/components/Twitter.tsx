import { useTheme } from 'next-themes';
import React from 'react';
import { TwitterTweetEmbed as Tweet } from 'react-twitter-embed';

export type TwitterProps = {
  tweetId: string;
};

export const Twitter: React.FC<TwitterProps> = ({ tweetId }) => {
  const { theme } = useTheme();
  return <Tweet tweetId={tweetId} options={{ theme }} />;
};
