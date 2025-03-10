// From Next.JS example https://github.com/vercel/next.js/blob/canary/examples/with-sentry-simple/pages/_error.js
import * as Sentry from '@sentry/nextjs';
import NextErrorComponent from 'next/error';

import type { NextPageContext } from 'next';

type MyErrorContext = NextPageContext & {
  statusCode: number;
  hasGetInitialPropsRun: boolean;
};

const MyError = ({ statusCode, hasGetInitialPropsRun, err }: MyErrorContext) => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

MyError.getInitialProps = async ({ res, err, asPath }: MyErrorContext) => {
  const errorInitialProps = (await NextErrorComponent.getInitialProps({
    res,
    err,
  } as MyErrorContext)) as MyErrorContext;

  errorInitialProps.hasGetInitialPropsRun = true;

  if (err) {
    Sentry.captureException(err);
    return errorInitialProps;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath?.toString() ?? ''}`),
  );

  return errorInitialProps;
};

export default MyError;
