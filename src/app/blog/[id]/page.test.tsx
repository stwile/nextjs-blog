import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BlogNotFoundError } from '~/features/blog/blog-not-found-error';

const notFoundMock = vi.hoisted(() =>
  vi.fn(() => {
    throw new Error('NOT_FOUND');
  }),
);
const getAllBlogIdsMock = vi.hoisted(() => vi.fn());
const getBlogByIdMock = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', () => ({
  notFound: notFoundMock,
}));

vi.mock('~/components/Twitter', () => ({
  Twitter: () => null,
}));

vi.mock('~/features/blog', () => ({
  getAllBlogIds: getAllBlogIdsMock,
  getBlogById: getBlogByIdMock,
}));

import BlogPage, { dynamicParams, generateMetadata, generateStaticParams } from './page';

const content = {
  id: 'article-id',
  body: '# Article',
  description: 'Article description',
  publishedAt: '2025-01-01T00:00:00.000Z',
  title: 'Article title',
};

describe('app/blog/[id]/page', () => {
  beforeEach(() => {
    notFoundMock.mockClear();
    getAllBlogIdsMock.mockReset();
    getBlogByIdMock.mockReset();
  });

  it('全記事IDから静的パラメータを生成する', async () => {
    getAllBlogIdsMock.mockResolvedValueOnce(['first', 'second']);

    await expect(generateStaticParams()).resolves.toEqual([{ id: 'first' }, { id: 'second' }]);
    expect(dynamicParams).toBe(false);
  });

  it('記事からMetadataを生成する', async () => {
    getBlogByIdMock.mockResolvedValueOnce(content);

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
    getBlogByIdMock.mockRejectedValueOnce(new BlogNotFoundError('missing'));

    await expect(BlogPage({ params: Promise.resolve({ id: 'missing' }) })).rejects.toThrow(
      'NOT_FOUND',
    );
    expect(notFoundMock).toHaveBeenCalledTimes(1);
  });

  it('CMS障害は上位のエラー境界へ送る', async () => {
    const error = new Error('CMS unavailable');
    getBlogByIdMock.mockRejectedValueOnce(error);

    await expect(BlogPage({ params: Promise.resolve({ id: 'failed' }) })).rejects.toBe(error);
    expect(notFoundMock).not.toHaveBeenCalled();
  });
});
