import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import React from 'react';

type Props = {
  dateString: string;
};

const Date = ({ dateString }: Props): JSX.Element => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
};

export default Date;
