import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import React from 'react';

type Props = {
  dateString: string;
};

export const Date: React.FC<Props> = ({ dateString }) => {
  const date = format(parseISO(dateString), 'yyyy/MM/dd');
  return <time dateTime={date}>{date}</time>;
};
