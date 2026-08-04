import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const notFoundMock = vi.hoisted(() =>
  vi.fn(() => {
    throw new Error('NOT_FOUND');
  }),
);
const clientGetMock = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', () => ({
  notFound: notFoundMock,
}));

vi.mock('~/lib/microcms', () => ({
  client: {
    get: clientGetMock,
  },
}));

import BlogPage from './page';

describe('app/blog/page/[id]/page', () => {
  beforeEach(() => {
    notFoundMock.mockClear();
    clientGetMock.mockReset();
  });

  it('無効なページ番号は notFound になる', async () => {
    await expect(BlogPage({ params: Promise.resolve({ id: 'abc' }) })).rejects.toThrow('NOT_FOUND');
    expect(clientGetMock).not.toHaveBeenCalled();
  });

  it('範囲外のページ番号は notFound になる', async () => {
    clientGetMock.mockResolvedValueOnce({ contents: [], totalCount: 5 });

    await expect(BlogPage({ params: Promise.resolve({ id: '2' }) })).rejects.toThrow('NOT_FOUND');
    expect(clientGetMock).toHaveBeenCalledTimes(1);
  });

  it('有効なページ番号は notFound にならない', async () => {
    clientGetMock.mockResolvedValueOnce({
      contents: [
        {
          id: 'article-1',
          publishedAt: '2026-08-02T00:00:00.000Z',
          title: '記事タイトル',
          description: '記事の説明',
        },
      ],
      totalCount: 11,
    });

    const page = await BlogPage({ params: Promise.resolve({ id: '1' }) });
    const html = renderToStaticMarkup(page);

    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain('1ページ目');
    expect(html).toContain('<h2 class="mb-2 text-2xl">');
    expect(html).toContain('aria-current="page"');
    expect(notFoundMock).not.toHaveBeenCalled();
  });
});
