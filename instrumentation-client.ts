import * as Sentry from '@sentry/nextjs';

const clientDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

export const register = () => {
  if (!clientDsn) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[sentry] NEXT_PUBLIC_SENTRY_DSN が未設定のためクライアント初期化をスキップしました');
    }
    return;
  }

  Sentry.init({
    dsn: clientDsn,
    integrations: [Sentry.replayIntegration()],
    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,
    // Define how likely Replay events are sampled.
    replaysSessionSampleRate: 0.1,
    // Define how likely Replay events are sampled when an error occurs.
    replaysOnErrorSampleRate: 1,
    debug: false,
  });
};
