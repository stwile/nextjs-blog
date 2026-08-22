import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';

import { OgImage } from '~/components/OgImage';
import { createOgImageOptions, getOgBaseImageDataUrl, OG_IMAGE_CONTENT_TYPE } from '~/lib/og';

import { getAllBlogIds, getBlogById } from '~/features/blog';
import { BlogNotFoundError } from '~/features/blog/blog-not-found-error';

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

export const contentType = OG_IMAGE_CONTENT_TYPE;

export const generateStaticParams = async (): Promise<Params[]> => {
  const ids = await getAllBlogIds();
  return ids.map((id) => ({ id }));
};

export default async function Image({ params }: Props): Promise<ImageResponse> {
  const { id } = await params;

  try {
    const content = await getBlogById(id);
    const backgroundImageSrc = await getOgBaseImageDataUrl();

    return new ImageResponse(
      <OgImage title={content.title} backgroundImageSrc={backgroundImageSrc} />,
      await createOgImageOptions(content.title),
    );
  } catch (error) {
    if (error instanceof BlogNotFoundError) {
      notFound();
    }

    throw error;
  }
}
