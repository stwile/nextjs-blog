import { useTheme } from 'next-themes';
import React from 'react';
import { Tweet } from 'react-twitter-widgets';

type Props = {
  tweetId: string;
};

export const Twitter: React.FC<Props> = ({ tweetId }) => {
  const { theme } = useTheme();
  return <Tweet tweetId={tweetId} options={{ theme }} />;
};
