import { Tweet } from 'react-tweet';

import type { FC } from 'react';

type Props = {
  tweetId: string;
};

export const Twitter: FC<Props> = ({ tweetId }) => {
  return <Tweet id={tweetId} />;
};
