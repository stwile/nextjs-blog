import Link from 'next/link';

import type { FC } from 'react';

type InnerLinkProps = {
  uri: string;
  title: string;
};

export const InnerLink: FC<InnerLinkProps> = ({ uri, title }) => <Link href={uri}>{title}</Link>;
