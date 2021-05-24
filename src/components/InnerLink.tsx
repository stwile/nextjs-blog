import React from 'react';
import Link from 'next/link';

export type InnerLinkProps = {
  uri: string;
  title: string;
};

export const InnerLink: React.VFC<InnerLinkProps> = ({ uri, title }: InnerLinkProps) => {
  return (
    <Link href={uri}>
      <a>{title}</a>
    </Link>
  );
};
