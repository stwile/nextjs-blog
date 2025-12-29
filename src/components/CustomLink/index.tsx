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

  // 例外を投げる可能性があるため、URL の解釈だけ try/catch で分離する
  const parsedUrl = (() => {
    try {
      return new URL(href);
    } catch {
      return null;
    }
  })();

  if (!parsedUrl) {
    return <span {...commonProps}>{children}</span>;
  }

  if (parsedUrl.hostname === DOMAIN_NAME) {
    return (
      <Link href={parsedUrl.pathname} {...commonProps}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};
