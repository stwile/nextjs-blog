import { ImageResponse } from 'next/og';

import { OgImage } from '~/components/OgImage';
import { createOgImageOptions, getOgBaseImageDataUrl, OG_IMAGE_CONTENT_TYPE } from '~/lib/og';
import { siteConfig } from '~/lib/site';

export const alt = siteConfig.title;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image(): Promise<ImageResponse> {
  const title = siteConfig.title;
  const backgroundImageSrc = await getOgBaseImageDataUrl();

  return new ImageResponse(
    <OgImage title={title} backgroundImageSrc={backgroundImageSrc} />,
    await createOgImageOptions(title),
  );
}
