import { beforeEach, describe, expect, it, vi } from 'vitest';

const readFileMock = vi.hoisted(() =>
  vi.fn(async (path: string) => {
    if (path.endsWith('og_base.png')) {
      return Buffer.from('png-binary');
    }

    return Buffer.from([1, 2, 3]);
  }),
);

vi.mock('node:fs/promises', () => ({
  readFile: readFileMock,
}));

vi.mock('next/cache', () => ({
  unstable_cache: <T extends (...args: never[]) => unknown>(fn: T) => fn,
}));

import { getOgBaseImageDataUrl, getOgFontData, truncateOgTitle } from './og';

describe('lib/og', () => {
  beforeEach(() => {
    readFileMock.mockClear();
    vi.restoreAllMocks();
  });

  it('Google Fonts から text=付きで必要グリフだけ取得する', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          "@font-face{src:url(https://fonts.gstatic.com/s/notosansjp/v42/test.woff) format('woff')}",
        ),
      )
      .mockResolvedValueOnce(
        new Response(new Uint8Array([0x77, 0x4f, 0x46, 0x46]).buffer, {
          headers: {
            'content-length': '4',
          },
        }),
      );
    vi.stubGlobal('fetch', fetchMock);

    const font = await getOgFontData('第一子が爆誕した🚀');

    expect(font.byteLength).toBe(4);
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const cssCall = fetchMock.mock.calls[0];
    if (!cssCall) {
      throw new Error('Google Fonts CSS の呼び出しがありません');
    }

    const [input, init] = cssCall;
    const url = new URL(String(input));
    expect(url.origin).toBe('https://fonts.googleapis.com');
    expect(url.searchParams.get('family')).toBe('Noto Sans JP:wght@700');
    expect(url.searchParams.get('text')).toContain('第');
    expect(url.searchParams.get('text')).toContain('🚀');
    expect(url.searchParams.get('text')).toContain('A');
    expect(init).toEqual(
      expect.objectContaining({
        cache: 'force-cache',
        headers: expect.objectContaining({
          'user-agent': expect.any(String),
        }),
      }),
    );
  });

  it('500KBを超えるか形式不正なら同梱サブセットにフォールバックする', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response("@font-face{src:url(https://example.com/test.woff) format('woff')}"),
      ),
    );

    const font = await getOgFontData('歯科');

    expect(font.byteLength).toBe(3);
    expect(readFileMock).toHaveBeenCalledWith(
      expect.stringContaining('src/app/api/og/NotoSansJP-Bold-subset.ttf'),
    );
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it('背景画像を data URL で返す', async () => {
    const result = await getOgBaseImageDataUrl();

    expect(result).toBe('data:image/png;base64,cG5nLWJpbmFyeQ==');
  });

  it('OGPタイトルを50文字で安全に切り詰める', () => {
    expect(truncateOgTitle('ＡＢＣ')).toBe('ABC');
    expect(truncateOgTitle('あ'.repeat(60))).toHaveLength(50);
  });
});
