import { createClient } from 'microcms-js-sdk';

const apiKey: string = process.env.MICROCMS_API_KEY as string;
const serviceDomain: string = process.env.MICROCMS_DOMAIN as string;

export const client = createClient({
  serviceDomain,
  apiKey,
});
