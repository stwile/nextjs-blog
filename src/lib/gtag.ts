export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || '';

export const existsGaId = GOOGLE_ANALYTICS_ID !== '';

export const pageView = (url: string): void => {
  if (GOOGLE_ANALYTICS_ID === '') {
    return;
  }

  window.gtag('config', GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};

type EventProps = {
  action: Gtag.EventNames;
  category: string;
  label: string;
  value: number;
};

export const event = ({ action, category, label, value }: EventProps): void =>
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
