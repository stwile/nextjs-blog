import { ContentType } from '../types/response/blog/ContentType';
import { ListType } from '../types/response/blog/ListType';

const key: string = process.env.API_KEY as string;
const headers = {
  headers: {
    'X-API-KEY': key,
  },
};

export type SearchParams = {
  offset?: number;
  limit?: number;
};

export const getAllContents = async (params?: SearchParams): Promise<ListType> => {
  const url = new URL(`${process.env.ENDPOINT}/blog`);
  if (params !== undefined) {
    if (params.offset !== undefined) {
      url.searchParams.append('offset', String(params.offset));
    }
    if (params.limit !== undefined) {
      url.searchParams.append('limit', String(params.limit));
    }
  }

  const res = await fetch(url.toString(), headers);
  return await res.json();
};

export const getContentById = async (id: string): Promise<ContentType> => {
  const url = `${process.env.ENDPOINT}/blog/${id}`;
  const res = await fetch(url, headers);
  return await res.json();
};
