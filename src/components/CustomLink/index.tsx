import Link from 'next/link';

import { DOMAIN_NAME } from '../Meta';

import type { ComponentProps, FC } from 'react';

type Props = {
  href: string;
} & ComponentProps<'a'>;

export const CustomLink: FC<Props> = ({ href, children, ...props }) => {
  if (href.startsWith('#')) {
    return <span {...props}>{children}</span>;
  }

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  try {
    const { hostname, pathname } = new URL(href);
    if (hostname === DOMAIN_NAME) {
      return (
        <Link href={pathname} {...props}>
          {children}
        </Link>
      );
    }
  } catch {
    return <span {...props}>{children}</span>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};
