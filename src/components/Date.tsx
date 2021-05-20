import { parseISO, format } from 'date-fns';
import React from 'react';

type Props = {
  dateString: string;
};

export const Date: React.FC<Props> = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
};
