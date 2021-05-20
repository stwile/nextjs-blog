import Error from 'next/error';
import React from 'react';

import { Layout } from '../components/Layout';

const Custom404 = (): JSX.Element => {
  return (
    <Layout>
      <Error statusCode={404} />;
    </Layout>
  );
};

export default Custom404;
