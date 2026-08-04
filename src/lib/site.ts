const DEFAULT_SITE_TITLE = 'ブログタイトル';
const DEFAULT_DESCRIPTION = 'Thinking reeds about book & Technology';
const DEFAULT_LOCAL_URL = 'http://localhost:3000';

export type SiteConfig = Readonly<{
  description: string;
  domain: string;
  openGraphUrl: URL;
  siteUrl: URL;
  title: string;
  twitterId: string | undefined;
}>;

const toUrl = (value: string | undefined): URL => {
  const candidate = value?.trim();

  if (!candidate) {
    return new URL(DEFAULT_LOCAL_URL);
  }

  if (/^https?:\/\//u.test(candidate)) {
    return new URL(candidate);
  }

  const protocol = candidate.startsWith('localhost') ? 'http' : 'https';
  return new URL(`${protocol}://${candidate}`);
};

const siteUrl = toUrl(
  process.env.NEXT_PUBLIC_DOMAIN ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL,
);

const openGraphUrl = toUrl(process.env.NEXT_PUBLIC_OPEN_GRAPH_DOMAIN ?? siteUrl.toString());

export const siteConfig = {
  description: process.env.DESCRIPTION || DEFAULT_DESCRIPTION,
  domain: siteUrl.hostname,
  openGraphUrl,
  siteUrl,
  title: process.env.NEXT_PUBLIC_SITE_TITLE || DEFAULT_SITE_TITLE,
  twitterId: process.env.NEXT_PUBLIC_TWITTER_ID || undefined,
} as const satisfies SiteConfig;

export const createOgImageUrl = (title: string): URL => {
  const url = new URL('/api/og', siteConfig.openGraphUrl);
  url.searchParams.set('title', title);
  return url;
};
