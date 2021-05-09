import { ContentType } from '../../types/response/blog/ContentType';
import { ListType } from '../../types/response/blog/ListType';

const key: string = process.env.API_KEY as string;
const headers = {
  headers: {
    'X-API-KEY': key,
  },
};

export const getAllContents = async (): Promise<ContentType[]> => {
  const url = `${process.env.ENDPOINT}/blog`;
  const res = await fetch(url, headers);
  const data: ListType = await res.json();
  return data.contents;
};

export const getContentById = async (id: string): Promise<ContentType> => {
  const url = `${process.env.ENDPOINT}/blog/${id}`;
  const res = await fetch(url, headers);
  return await res.json();
};
