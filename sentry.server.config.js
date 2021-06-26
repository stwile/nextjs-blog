import Sentry from '@sentry/nextjs';

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

/** @type {import('@sentry/nextjs/src/utils/nextjsOptions').NextjsOptions} */
const options = {
  dsn,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
};

Sentry.init(options);
