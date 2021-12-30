import React from 'react';

import { MetaType } from '../types/blog/MetaType';

import { Footer } from './Footer';
import { Header } from './Header';
import { Meta } from './Meta';

type Props = {
  children: React.ReactNode;
  meta: MetaType;
};

export const Layout: React.FC<Props> = ({ children, meta }) => (
  <>
    <Meta meta={meta} />
    <Header />
    <main className="max-w-5xl px-8 mx-auto">{children}</main>
    <Footer />
  </>
);
