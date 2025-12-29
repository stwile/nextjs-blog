import Link from 'next/link';

import type { FC } from 'react';

type Props = {
  uri: string;
  title: string;
  className?: string;
};

export const InnerLink: FC<Props> = ({ uri, title, className }) => (
  <Link href={uri} className={className ?? 'underline underline-offset-2'}>
    {title}
  </Link>
);
