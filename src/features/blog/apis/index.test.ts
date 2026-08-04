import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

const clientGetListDetailMock = vi.hoisted(() => vi.fn());
const clientGetListMock = vi.hoisted(() => vi.fn());
const clientGetAllContentIdsMock = vi.hoisted(() => vi.fn());

vi.mock('server-only', () => ({}));

vi.mock('microcms-js-sdk', () => ({
  createClient: () => ({
    getListDetail: clientGetListDetailMock,
    getList: clientGetListMock,
    getAllContentIds: clientGetAllContentIdsMock,
  }),
}));

const response = {
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

describe('microCMS blog API', () => {
  beforeAll(() => {
    vi.stubEnv('MICROCMS_API_KEY', 'test-api-key');
    vi.stubEnv('MICROCMS_DOMAIN', 'test-domain');
  });

  beforeEach(() => {
    clientGetListDetailMock.mockReset();
    clientGetListMock.mockReset();
    clientGetAllContentIdsMock.mockReset();
  });

  it('microCMSの404をBlogNotFoundErrorへ変換する', async () => {
    const { BlogNotFoundError } = await import('../blog-not-found-error');
    const { getBlogById } = await import('.');
    clientGetListDetailMock.mockRejectedValueOnce(new Error('fetch API response status: 404'));

    await expect(getBlogById('missing')).rejects.toBeInstanceOf(BlogNotFoundError);
  });

  it('404以外のSDKエラーを取得エラーへ変換する', async () => {
    const { getBlogById } = await import('.');
    const error = new Error('fetch API response status: 500');
    clientGetListDetailMock.mockRejectedValueOnce(error);

    await expect(getBlogById('failed')).rejects.toMatchObject({
      message: 'Failed to fetch blog content',
      cause: error,
    });
  });

  it('APIレスポンスをドメイン型へ変換する', async () => {
    const { getBlogById } = await import('.');
    clientGetListDetailMock.mockResolvedValueOnce(response);

    await expect(getBlogById(response.id)).resolves.toEqual({
      id: response.id,
      body: response.body,
      description: response.description,
      publishedAt: response.publishedAt,
      title: response.title,
    });
  });

  it('一覧のページ指定をoffsetとlimitへ変換する', async () => {
    const { getBlogList } = await import('.');
    clientGetListMock.mockResolvedValueOnce({
      contents: [response],
      totalCount: 21,
      offset: 10,
      limit: 10,
    });

    await expect(getBlogList({ page: 2, perPage: 10 })).resolves.toEqual({
      items: [
        {
          id: response.id,
          description: response.description,
          publishedAt: response.publishedAt,
          title: response.title,
        },
      ],
      totalCount: 21,
    });
    expect(clientGetListMock).toHaveBeenCalledWith({
      endpoint: 'blog',
      queries: { offset: 10, limit: 10 },
    });
  });

  it('全記事IDを取得する', async () => {
    const { getAllBlogIds } = await import('.');
    clientGetAllContentIdsMock.mockResolvedValueOnce(['first', 'second']);

    await expect(getAllBlogIds()).resolves.toEqual(['first', 'second']);
  });
});
