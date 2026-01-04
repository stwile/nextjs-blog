import { beforeEach, describe, expect, it, vi } from 'vitest';

const notFoundMock = vi.hoisted(() =>
  vi.fn(() => {
    throw new Error('NOT_FOUND');
  }),
);
const clientGetMock = vi.hoisted(() => vi.fn());
const serializeBlogMdxMock = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', () => ({
  notFound: notFoundMock,
}));

vi.mock('~/lib/microcms', () => ({
  client: {
    get: clientGetMock,
  },
}));

vi.mock('~/lib/serializeBlogMdx', () => ({
  serializeBlogMdx: serializeBlogMdxMock,
}));

vi.mock('~/components/MdxContent', () => ({
  MdxContent: () => null,
}));

import BlogDetailPage, { generateMetadata, generateStaticParams } from './page';

describe('app/blog/[id]/page', () => {
  beforeEach(() => {
    notFoundMock.mockClear();
    clientGetMock.mockReset();
    serializeBlogMdxMock.mockReset();
    serializeBlogMdxMock.mockResolvedValue({
      compiledSource: 'compiled',
      frontmatter: {},
      scope: {},
    });
  });

  it('generateStaticParams が記事IDを返す', async () => {
    clientGetMock.mockResolvedValueOnce({
      contents: [{ id: 'a' }, { id: 'b' }],
      totalCount: 2,
      offset: 0,
      limit: 100,
    });

    await expect(generateStaticParams()).resolves.toEqual([{ id: 'a' }, { id: 'b' }]);
    expect(clientGetMock).toHaveBeenCalledTimes(1);
  });

  it('generateMetadata が記事情報からメタデータを生成する', async () => {
    clientGetMock.mockResolvedValueOnce({
      id: 'a',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
      publishedAt: '2025-01-01T00:00:00.000Z',
      revisedAt: '2025-01-01T00:00:00.000Z',
      title: 'テスト記事',
      description: '説明文',
      body: '本文',
      tags: [],
    });

    const metadata = await generateMetadata({ params: Promise.resolve({ id: 'a' }) });

    expect(metadata).toEqual({
      title: 'テスト記事 | ブログタイトル',
      description: '説明文',
      openGraph: {
        title: 'テスト記事 | ブログタイトル',
        description: '説明文',
        type: 'article',
        images: [`https://localhost/api/og?title=テスト記事`],
      },
    });
  });

  it('取得失敗時は notFound になる', async () => {
    clientGetMock.mockRejectedValueOnce(new Error('fetch error'));

    await expect(BlogDetailPage({ params: Promise.resolve({ id: 'missing' }) })).rejects.toThrow(
      'NOT_FOUND',
    );
  });

  it('generateMetadata で取得失敗時は notFound になる', async () => {
    clientGetMock.mockRejectedValueOnce(new Error('fetch error'));

    await expect(generateMetadata({ params: Promise.resolve({ id: 'missing' }) })).rejects.toThrow(
      'NOT_FOUND',
    );
  });
});
