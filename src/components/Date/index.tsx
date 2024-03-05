import { format, parseISO } from 'date-fns';

import type { FC } from 'react';

type Props = {
  dateString: string;
};

export const Date: FC<Props> = ({ dateString }) => {
  const date = format(parseISO(dateString), 'yyyy/MM/dd');
  return <time dateTime={date}>{date}</time>;
};
