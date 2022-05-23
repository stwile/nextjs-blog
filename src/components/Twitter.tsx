import { useTheme } from 'next-themes';
import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

type Props = {
  tweetId: string;
};

export const Twitter: React.FC<Props> = ({ tweetId }) => {
  const { theme } = useTheme();
  return <TwitterTweetEmbed tweetId={tweetId} options={{ theme }} />;
};
