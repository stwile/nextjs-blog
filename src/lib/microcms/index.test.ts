import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

const clientGetMock = vi.hoisted(() => vi.fn());

vi.mock('microcms-js-sdk', () => ({
  createClient: () => ({
    get: clientGetMock,
  }),
}));

describe('getBlogContent', () => {
  beforeAll(() => {
    vi.stubEnv('MICROCMS_API_KEY', 'test-api-key');
    vi.stubEnv('MICROCMS_DOMAIN', 'test-domain');
  });

  beforeEach(() => {
    clientGetMock.mockReset();
  });

  it('microCMSの404をBlogNotFoundErrorへ変換する', async () => {
    const { BlogNotFoundError, getBlogContent } = await import('.');
    clientGetMock.mockRejectedValueOnce(new Error('fetch API response status: 404'));

    await expect(getBlogContent('missing')).rejects.toBeInstanceOf(BlogNotFoundError);
  });

  it('404以外のエラーは変換しない', async () => {
    const { getBlogContent } = await import('.');
    const error = new Error('fetch API response status: 500');
    clientGetMock.mockRejectedValueOnce(error);

    await expect(getBlogContent('failed')).rejects.toBe(error);
  });
});
