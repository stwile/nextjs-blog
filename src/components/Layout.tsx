import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { Meta } from './Meta';
import { MetaType } from '../types/blog/MetaType';

type Props = {
  children: React.ReactNode;
  customMeta?: MetaType;
};

export const Layout: React.FC<Props> = ({ children, customMeta }) => (
  <>
    <Meta customMeta={customMeta} />
    <Header />
    <main className="max-w-5xl px-8 mx-auto">{children}</main>
    <Footer />
  </>
);

export default Layout;
