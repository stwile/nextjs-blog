import { withSentryConfig } from '@sentry/nextjs';

import type { NextConfig } from 'next';

const basePath = '';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  serverRuntimeConfig: {
    rootDir: __dirname,
  },
  basePath,
  transpilePackages: ['react-tweet'],
};

// Injected content via Sentry wizard below
module.exports = withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: 'volare-viah',
  project: 'volare-viah',

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
