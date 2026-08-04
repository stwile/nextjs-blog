import { format, parseISO } from 'date-fns';

type Props = Readonly<{
  dateString: string;
}>;

const Date = ({ dateString }: Props) => {
  const date = format(parseISO(dateString), 'yyyy/MM/dd');
  return <time dateTime={date}>{date}</time>;
};

export { Date };
