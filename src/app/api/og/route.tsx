import { ImageResponse } from 'next/og';

import type { NextRequest } from 'next/server';

import { OgImage } from '~/components/OgImage';

export const GET = (request: NextRequest): Response => {
  try {
    const title = request.nextUrl.searchParams.get('title');
    if (title === null) {
      throw new Error('Title is required');
    }

    return new ImageResponse(<OgImage title={title} />, {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(String(error));
    }

    return new Response('Failed to generate the image', {
      status: 500,
    });
  }
};
