import Link from 'next/link';

import { DOMAIN_NAME } from '../Meta';

import type { ComponentProps, FC } from 'react';

type Props = {
  href: string;
} & Omit<ComponentProps<'a'>, 'ref'>;

export const CustomLink: FC<Props> = ({ href, children, ...props }) => {
  // 特定の不要なプロパティを除外
  const { className, style } = props;
  const commonProps = { className, style };

  if (href.startsWith('#')) {
    return <span {...commonProps}>{children}</span>;
  }

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...commonProps}>
        {children}
      </Link>
    );
  }

  try {
    const { hostname, pathname } = new URL(href);
    if (hostname === DOMAIN_NAME) {
      return (
        <Link href={pathname} {...commonProps}>
          {children}
        </Link>
      );
    }
  } catch {
    return <span {...commonProps}>{children}</span>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};
