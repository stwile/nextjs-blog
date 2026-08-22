import { beforeEach, describe, expect, it, vi } from 'vitest';

const ImageResponseMock = vi.hoisted(() =>
  vi.fn(function ImageResponse(_element: unknown, _options: unknown) {
    return new Response('image');
  }),
);
const getAllBlogIdsMock = vi.hoisted(() => vi.fn());
const getBlogByIdMock = vi.hoisted(() => vi.fn());
const createOgImageOptionsMock = vi.hoisted(() =>
  vi.fn(async () => ({
    width: 1200,
    height: 630,
    fonts: [{ data: new Uint8Array([1]), name: 'Noto Sans JP', weight: 700 }],
  })),
);
const getOgBaseImageDataUrlMock = vi.hoisted(() =>
  vi.fn(async () => 'data:image/png;base64,abc123'),
);

vi.mock('next/og', () => ({
  ImageResponse: ImageResponseMock,
}));

vi.mock('~/features/blog', () => ({
  getAllBlogIds: getAllBlogIdsMock,
  getBlogById: getBlogByIdMock,
}));

vi.mock('~/lib/og', () => ({
  OG_IMAGE_CONTENT_TYPE: 'image/png',
  createOgImageOptions: createOgImageOptionsMock,
  getOgBaseImageDataUrl: getOgBaseImageDataUrlMock,
}));

import Image, { contentType, generateStaticParams } from './opengraph-image';

describe('app/blog/[id]/opengraph-image', () => {
  beforeEach(() => {
    ImageResponseMock.mockClear();
    getAllBlogIdsMock.mockReset();
    getBlogByIdMock.mockReset();
    createOgImageOptionsMock.mockClear();
    getOgBaseImageDataUrlMock.mockClear();
  });

  it('記事IDから静的パラメータを生成する', async () => {
    getAllBlogIdsMock.mockResolvedValueOnce(['first', 'second']);

    await expect(generateStaticParams()).resolves.toEqual([{ id: 'first' }, { id: 'second' }]);
    expect(contentType).toBe('image/png');
  });

  it('記事タイトルからOGP画像を生成する', async () => {
    getBlogByIdMock.mockResolvedValueOnce({
      id: 'article-id',
      title: '第一子が爆誕した',
    });

    const response = await Image({ params: Promise.resolve({ id: 'article-id' }) });

    expect(response).toBeInstanceOf(Response);
    expect(createOgImageOptionsMock).toHaveBeenCalledWith('第一子が爆誕した');
    expect(getOgBaseImageDataUrlMock).toHaveBeenCalledTimes(1);
    expect(ImageResponseMock).toHaveBeenCalledTimes(1);
  });
});
