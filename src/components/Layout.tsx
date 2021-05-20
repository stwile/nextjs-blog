import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { Meta } from './Meta';

export const siteTitle = 'Volare Viah';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.VFC<Props> = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Meta />
      <Header />
      <main>
        <div className="max-w-5xl px-8 py-4 mx-auto">{children}</div>
      </main>
      <Footer />
    </>
  );
};
