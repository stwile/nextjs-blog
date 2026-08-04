import Link from 'next/link';

type Props = Readonly<{
  uri: string;
  title: string;
  className?: string;
  ariaCurrent?: 'page';
}>;

const InnerLink = ({ uri, title, className, ariaCurrent }: Props) => {
  return (
    <Link
      href={uri}
      className={className ?? 'underline underline-offset-2'}
      aria-current={ariaCurrent}
    >
      {title}
    </Link>
  );
};

export { InnerLink };
