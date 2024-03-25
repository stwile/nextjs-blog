import Link from 'next/link';

import type { FC } from 'react';

type Props = {
  uri: string;
  title: string;
};

export const InnerLink: FC<Props> = ({ uri, title }) => <Link href={uri}>{title}</Link>;
