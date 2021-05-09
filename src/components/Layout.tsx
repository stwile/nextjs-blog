import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { Meta } from './Meta';

export const siteTitle = 'Volare Viah';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};
