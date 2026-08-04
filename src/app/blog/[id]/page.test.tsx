import { beforeEach, describe, expect, it, vi } from 'vitest';

const notFoundMock = vi.hoisted(() =>
  vi.fn(() => {
    throw new Error('NOT_FOUND');
  }),
);
const clientGetAllContentIdsMock = vi.hoisted(() => vi.fn());
const getBlogContentMock = vi.hoisted(() => vi.fn());
const BlogNotFoundErrorMock = vi.hoisted(
  () =>
    class BlogNotFoundError extends Error {
      constructor(id: string) {
        super(`Blog content was not found: ${id}`);
      }
    },
);

vi.mock('next/navigation', () => ({
  notFound: notFoundMock,
}));

vi.mock('~/components/Twitter', () => ({
  Twitter: () => null,
}));

vi.mock('~/lib/microcms', () => ({
  BlogNotFoundError: BlogNotFoundErrorMock,
  client: {
    getAllContentIds: clientGetAllContentIdsMock,
  },
  getBlogContent: getBlogContentMock,
}));

import BlogPage, { dynamicParams, generateMetadata, generateStaticParams } from './page';

const content = {
  id: 'article-id',
  body: '# Article',
  createdAt: '2025-01-01T00:00:00.000Z',
  description: 'Article description',
  publishedAt: '2025-01-01T00:00:00.000Z',
  revisedAt: '2025-01-01T00:00:00.000Z',
  tags: [],
  title: 'Article title',
  updatedAt: '2025-01-01T00:00:00.000Z',
};

describe('app/blog/[id]/page', () => {
  beforeEach(() => {
    notFoundMock.mockClear();
    clientGetAllContentIdsMock.mockReset();
    getBlogContentMock.mockReset();
  });

  it('全記事IDから静的パラメータを生成する', async () => {
    clientGetAllContentIdsMock.mockResolvedValueOnce(['first', 'second']);

    await expect(generateStaticParams()).resolves.toEqual([{ id: 'first' }, { id: 'second' }]);
    expect(dynamicParams).toBe(false);
  });

  it('記事からMetadataを生成する', async () => {
    getBlogContentMock.mockResolvedValueOnce(content);

    const metadata = await generateMetadata({ params: Promise.resolve({ id: content.id }) });

    expect(metadata).toEqual(
      expect.objectContaining({
        title: content.title,
        description: content.description,
        alternates: { canonical: `/blog/${content.id}` },
      }),
    );
  });

  it('記事が存在しない場合はnotFoundにする', async () => {
    getBlogContentMock.mockRejectedValueOnce(new BlogNotFoundErrorMock('missing'));

    await expect(BlogPage({ params: Promise.resolve({ id: 'missing' }) })).rejects.toThrow(
      'NOT_FOUND',
    );
    expect(notFoundMock).toHaveBeenCalledTimes(1);
  });

  it('CMS障害は上位のエラー境界へ送る', async () => {
    const error = new Error('CMS unavailable');
    getBlogContentMock.mockRejectedValueOnce(error);

    await expect(BlogPage({ params: Promise.resolve({ id: 'failed' }) })).rejects.toBe(error);
    expect(notFoundMock).not.toHaveBeenCalled();
  });
});
