import { createClient } from 'microcms-js-sdk';

const apiKey: string = process.env.MICROCMS_API_KEY ?? '';
const serviceDomain: string = process.env.MICROCMS_DOMAIN ?? '';

if (apiKey === '' || serviceDomain === '') {
  throw new Error('Please set your API_KEY and SERVICE_DOMAIN in .env');
}

export const client = createClient({
  serviceDomain,
  apiKey,
});
