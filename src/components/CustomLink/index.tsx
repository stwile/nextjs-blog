import Link from 'next/link';

import { DOMAIN_NAME } from '../Meta';

import type { ComponentProps, FC } from 'react';

type Props = ComponentProps<'a'>;

export const CustomLink: FC<Props> = ({ href, children, ...props }) => {
  const url = href ?? '';

  if (url.startsWith('/')) {
    return <Link href={url}>{children}</Link>;
  }

  try {
    const { hostname, pathname } = new URL(url);
    if (hostname === DOMAIN_NAME) {
      return <Link href={pathname}>{children}</Link>;
    }
  } catch {
    return null;
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};
