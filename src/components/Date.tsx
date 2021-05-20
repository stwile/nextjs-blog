import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import React from 'react';

type Props = {
  dateString: string;
};

export const Date = ({ dateString }: Props): JSX.Element => {
  return <time dateTime={dateString}>{format(parseISO(dateString), 'LLLL d, yyyy')}</time>;
};
