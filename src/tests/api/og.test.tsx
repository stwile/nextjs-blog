import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NextRequest } from 'next/server';
import { isValidElement } from 'react';

const ImageResponseMock = vi.hoisted(() =>
  vi.fn(function ImageResponse(_element: unknown, options: { headers?: HeadersInit } | undefined) {
    return new Response('image', { headers: options?.headers });
  }),
);

vi.mock('next/og', () => ({
  ImageResponse: ImageResponseMock,
}));

import { GET } from '~/app/api/og/route';

describe('api/og Route Handler', () => {
  beforeEach(() => {
    ImageResponseMock.mockClear();
  });

  it('タイトル付きでImageResponseを返す', () => {
    const request = new NextRequest('https://example.com/api/og?title=Hello');

    const result = GET(request);

    expect(ImageResponseMock).toHaveBeenCalledTimes(1);

    const firstCall = ImageResponseMock.mock.calls[0];
    if (!firstCall) {
      throw new Error('ImageResponseが呼び出されていません');
    }

    const [element, options] = firstCall;
    expect(isValidElement<{ title: string }>(element)).toBe(true);
    if (!isValidElement<{ title: string }>(element)) {
      throw new Error('ImageResponseの第1引数がReact要素ではありません');
    }

    expect(element.props.title).toBe('Hello');
    expect(options).toEqual({
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      },
      height: 630,
      width: 1200,
    });
    expect(result).toBeInstanceOf(Response);
    expect(result.headers.get('Cache-Control')).toBe(
      'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    );
  });

  it('titleがない場合は500を返す', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const request = new NextRequest('https://example.com/api/og');

    const result = GET(request);

    expect(logSpy).toHaveBeenCalledWith('Title is required');
    expect(result).toBeInstanceOf(Response);
    expect(result.status).toBe(500);
    await expect(result.text()).resolves.toBe('Failed to generate the image');

    logSpy.mockRestore();
  });
});
