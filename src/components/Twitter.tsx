import React from 'react';
import { Tweet } from 'react-twitter-widgets';
import { useTheme } from 'next-themes';

type Props = {
  tweetId: string;
};

export const Twitter: React.FC<Props> = ({ tweetId }) => {
  const { theme } = useTheme();
  return <Tweet tweetId={tweetId} options={{ theme }} />;
};
