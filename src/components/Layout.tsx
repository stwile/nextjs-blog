import { Footer } from './Footer';
import { Header } from './Header';
import { Meta } from './Meta';

import type { FC, ReactNode } from 'react';
import type { MetaType } from '~/types/blog/MetaType';

type Props = {
  children: ReactNode;
  meta: MetaType;
};

export const Layout: FC<Props> = ({ children, meta }) => (
  <>
    <Meta meta={meta} />
    <Header />
    <main className="max-w-5xl px-8 mx-auto">{children}</main>
    <Footer />
  </>
);
