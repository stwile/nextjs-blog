import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const clientGetMock = vi.hoisted(() => vi.fn());

vi.mock('~/lib/microcms', () => ({
  client: {
    get: clientGetMock,
  },
}));

import Home from './page';

describe('app/page', () => {
  beforeEach(() => {
    clientGetMock.mockReset();
  });

  it('ページ見出しをh1、記事タイトルをh2で表示する', async () => {
    clientGetMock.mockResolvedValueOnce({
      contents: [
        {
          id: 'article-1',
          publishedAt: '2026-08-02T00:00:00.000Z',
          title: '記事タイトル',
          description: '記事の説明',
        },
      ],
      totalCount: 1,
    });

    const html = renderToStaticMarkup(await Home());

    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain(`<h1>`);
    expect(html).toContain('<h2 class="mb-2 text-2xl">');
    expect(html).toContain('記事タイトル');
  });
});
