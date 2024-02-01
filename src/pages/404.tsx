import Error from 'next/error';

import type { FC } from 'react';

const Custom404: FC = () => <Error statusCode={404} />;

export default Custom404;
