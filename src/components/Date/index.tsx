import { format, parseISO } from 'date-fns';

import type { FC } from 'react';

type Props = {
  dateString: string;
};

export const Date: FC<Props> = ({ dateString }) => {
  const parsed = parseISO(dateString);
  const date = format(parsed, 'yyyy/MM/dd');
  return <time dateTime={date}>{date}</time>;
};
