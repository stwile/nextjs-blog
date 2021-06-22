const { withSentryConfig } = require('@sentry/nextjs');

const { NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN } = process.env;

process.env.SENTRY_DSN = SENTRY_DSN;

/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */
const moduleExports = {
  productionBrowserSourceMaps: true,
};

const SentryWebpackPluginOptions = {};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
