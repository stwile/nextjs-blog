import { SentryBuildOptions, withSentryConfig } from '@sentry/nextjs';

import type { NextConfig } from 'next';

const basePath = '';

const nextConfig = {
  productionBrowserSourceMaps: true,
  basePath,
  transpilePackages: ['react-tweet'],
  eslint: { ignoreDuringBuilds: true },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'], // ここに 'stories.tsx' を含めない
  reactStrictMode: true,
} satisfies NextConfig;

const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Webpack-specific options
  webpack: {
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    treeshake: {
      removeDebugLogging: true,
    },
    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
} satisfies SentryBuildOptions;

// Injected content via Sentry wizard below
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
