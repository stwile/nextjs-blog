import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { unstable_cache } from 'next/cache';

const FONT_NAME = 'Noto Sans JP';
const GOOGLE_FONT_CSS_URL = 'https://fonts.googleapis.com/css2';
const GOOGLE_FONT_ORIGIN = 'https://fonts.gstatic.com';
const GOOGLE_FONT_USER_AGENT = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)';
const GOOGLE_FONT_FALLBACK_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 -_,.:!?()&/';
const GOOGLE_FONT_URL_PATTERN =
  /url\((['"]?)(https:\/\/fonts\.gstatic\.com\/[^)'"\s]+)\1\)\s*format\(\s*['"]?woff['"]?\s*\)/iu;
const MAX_FONT_BYTES = 500 * 1024;
const MAX_TITLE_LENGTH = 50;
const GOOGLE_FONT_TIMEOUT_MS = 5_000;
const FALLBACK_FONT_PATH = join(process.cwd(), 'src/app/api/og/NotoSansJP-Bold-subset.ttf');
const OG_BASE_IMAGE_PATH = join(process.cwd(), 'public/images/og_base.png');

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const OG_IMAGE_CONTENT_TYPE = 'image/png';

const toArrayBuffer = (value: Buffer): ArrayBuffer =>
  value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength) as ArrayBuffer;

const uniqueChars = (value: string): string => Array.from(new Set(Array.from(value))).join('');

export const truncateOgTitle = (title: string): string =>
  Array.from(title.normalize('NFKC')).slice(0, MAX_TITLE_LENGTH).join('');

const createGoogleFontText = (title: string): string =>
  uniqueChars(`${truncateOgTitle(title)}${GOOGLE_FONT_FALLBACK_CHARS}`);

const getFallbackFontData = unstable_cache(
  async (): Promise<string> => {
    const font = await readFile(FALLBACK_FONT_PATH);
    return font.toString('base64');
  },
  ['og-fallback-font-v1'],
  { revalidate: false },
);

export const getOgBaseImageDataUrl = unstable_cache(
  async (): Promise<string> => {
    const image = await readFile(OG_BASE_IMAGE_PATH);
    return `data:image/png;base64,${image.toString('base64')}`;
  },
  ['og-base-image-v1'],
  { revalidate: false },
);

const getGoogleFontData = unstable_cache(
  async (text: string): Promise<string> => {
    const cssUrl = new URL(GOOGLE_FONT_CSS_URL);
    cssUrl.searchParams.set('family', 'Noto Sans JP:wght@700');
    cssUrl.searchParams.set('display', 'swap');
    cssUrl.searchParams.set('text', text);

    const cssResponse = await fetch(cssUrl, {
      cache: 'force-cache',
      headers: {
        'user-agent': GOOGLE_FONT_USER_AGENT,
      },
      redirect: 'error',
      signal: AbortSignal.timeout(GOOGLE_FONT_TIMEOUT_MS),
    });
    if (!cssResponse.ok) {
      throw new Error(`Failed to fetch Google Fonts CSS: ${cssResponse.status}`);
    }

    const css = await cssResponse.text();
    const matchedFontUrl = css.match(GOOGLE_FONT_URL_PATTERN)?.[2];
    if (!matchedFontUrl) {
      throw new Error('Supported Google Fonts format was not found');
    }

    const fontUrl = new URL(matchedFontUrl);
    if (fontUrl.origin !== GOOGLE_FONT_ORIGIN) {
      throw new Error(`Unexpected Google Fonts origin: ${fontUrl.origin}`);
    }
    const fontResponse = await fetch(fontUrl, {
      cache: 'force-cache',
      redirect: 'error',
      signal: AbortSignal.timeout(GOOGLE_FONT_TIMEOUT_MS),
    });
    if (!fontResponse.ok) {
      throw new Error(`Failed to fetch Google Fonts binary: ${fontResponse.status}`);
    }

    const contentLength = Number(fontResponse.headers.get('content-length') ?? '0');
    if (contentLength > MAX_FONT_BYTES) {
      throw new Error(`Font payload exceeded 500KB: ${contentLength}`);
    }

    const font = await fontResponse.arrayBuffer();
    if (font.byteLength > MAX_FONT_BYTES) {
      throw new Error(`Font payload exceeded 500KB: ${font.byteLength}`);
    }

    if (font.byteLength === 0) {
      throw new Error('Google Fonts returned an empty payload');
    }

    const signature = Buffer.from(font).subarray(0, 4).toString('ascii');
    if (!['OTTO', 'wOFF', '\u0000\u0001\u0000\u0000'].includes(signature)) {
      throw new Error(`Unsupported font signature: ${signature || 'unknown'}`);
    }

    return Buffer.from(font).toString('base64');
  },
  ['og-google-font-v2'],
  { revalidate: false },
);

export const getOgFontData = async (title: string): Promise<ArrayBuffer> => {
  try {
    return toArrayBuffer(
      Buffer.from(await getGoogleFontData(createGoogleFontText(title)), 'base64'),
    );
  } catch (error) {
    console.warn('Falling back to the bundled OGP font subset.', error);
    return toArrayBuffer(Buffer.from(await getFallbackFontData(), 'base64'));
  }
};

export const createOgImageOptions = async (title: string) => ({
  ...OG_IMAGE_SIZE,
  emoji: 'twemoji' as const,
  fonts: [
    {
      data: await getOgFontData(title),
      name: FONT_NAME,
      style: 'normal' as const,
      weight: 700 as const,
    },
  ],
});
