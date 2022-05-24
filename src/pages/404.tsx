import Error from 'next/error';
import React from 'react';

const Custom404: React.FC = () => <Error statusCode={404} />;

export default Custom404;
