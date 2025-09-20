import * as Sentry from '@sentry/nextjs';

const serverDsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;

export const register = () => {
  if (!serverDsn) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[sentry] DSN が未設定のため初期化をスキップしました');
    }
    return;
  }

  Sentry.init({
    dsn: serverDsn,
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,
    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
};
