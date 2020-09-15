import React from 'react';
import Error from 'next/error';

const Custom404: React.FC = () => {
  return <Error statusCode={404} />;
};

export default Custom404;
