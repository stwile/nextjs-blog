import Sentry from '@sentry/nextjs';

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

/** @type {import('@sentry/nextjs/src/utils/nextjsOptions').NextjsOptions} */
const options = {
  dsn,
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
};
Sentry.init(options);
