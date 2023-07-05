import Link from 'next/link';
import React from 'react';

type InnerLinkProps = {
  uri: string;
  title: string;
};

export const InnerLink: React.FC<InnerLinkProps> = ({ uri, title }) => (
  <Link href={uri}>{title}</Link>
);
