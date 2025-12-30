import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { NextRequest } from 'next/server';

const ImageResponseMock = vi.hoisted(() =>
  vi.fn(function ImageResponse(element: unknown, options: unknown) {
    return {
      __mock: 'ImageResponse',
      element,
      options,
    };
  }),
);

vi.mock('@vercel/og', () => ({
  ImageResponse: ImageResponseMock,
}));

import handler from '~/pages/api/og';

describe('api/og handler', () => {
  beforeEach(() => {
    ImageResponseMock.mockClear();
  });

  it('タイトル付きでImageResponseを返す', () => {
    const req = {
      url: 'https://example.com/api/og?title=Hello',
    } as NextRequest;

    const result = handler(req);

    expect(ImageResponseMock).toHaveBeenCalledTimes(1);

    const firstCall = ImageResponseMock.mock.calls[0];
    expect(firstCall).toBeDefined();
    const [element, options] = firstCall as [unknown, { height: number; width: number }];
    expect((element as { props: { title: string } }).props.title).toBe('Hello');
    expect(options).toEqual({ height: 630, width: 1200 });
    expect(result).toEqual(expect.objectContaining({ __mock: 'ImageResponse' }));
  });

  it('titleがない場合は500を返す', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const req = {
      url: 'https://example.com/api/og',
    } as NextRequest;

    const result = handler(req);

    expect(logSpy).toHaveBeenCalledWith('Title is required');
    expect(result).toBeInstanceOf(Response);
    expect(result.status).toBe(500);
    await expect(result.text()).resolves.toBe('Failed to generate the image');

    logSpy.mockRestore();
  });
});
