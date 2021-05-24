import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="max-w-5xl px-8 mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
