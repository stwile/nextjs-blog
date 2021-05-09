import Error from 'next/error';
import React from 'react';

const Custom404 = (): JSX.Element => {
  return <Error statusCode={404} />;
};

export default Custom404;
