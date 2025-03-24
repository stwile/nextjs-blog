import Link from 'next/link';

import { DOMAIN_NAME } from '../Meta';

import type { ComponentProps, FC } from 'react';

type Props = {
  href: string;
} & ComponentProps<'a'>;

export const CustomLink: FC<Props> = ({ href, children, ...props }) => {
  if (href.startsWith('/')) {
    return <Link href={{ pathname: href }}>{children}</Link>;
  }

  try {
    const { hostname, pathname } = new URL(href);
    if (hostname === DOMAIN_NAME) {
      return <Link href={{ pathname }}>{children}</Link>;
    }
  } catch (e) {
    console.warn(`Invalid URL passed to CustomLink: ${href}`, e);
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};
