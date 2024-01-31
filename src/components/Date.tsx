import { format, parseISO } from 'date-fns';
import React from 'react';

type Props = {
  dateString: string;
};

export const Date: React.FC<Props> = ({ dateString }) => {
  const date = format(parseISO(dateString), 'yyyy/MM/dd');
  return <time dateTime={date}>{date}</time>;
};
