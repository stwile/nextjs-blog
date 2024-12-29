import { ImageResponse } from '@vercel/og';

import type { NextRequest } from 'next/server';

import { OgImage } from '~/components/OgImage';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest): Response {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title');
    if (title === null) {
      throw new Error('Title is required');
    }

    return new ImageResponse(<OgImage title={title} />, {
      width: 1200,
      height: 630,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`${e.message}`);
    } else {
      console.log(String(e));
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
