import { ImageResponse } from 'next/og';

import { OgImage } from '~/components/OgImage';
import { createOgImageOptions, getOgBaseImageDataUrl, OG_IMAGE_CONTENT_TYPE } from '~/lib/og';
import { siteConfig } from '~/lib/site';

import { PER_PAGE } from '~/components/Pagination';
import { getBlogList } from '~/features/blog';

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

export const contentType = OG_IMAGE_CONTENT_TYPE;

export const generateStaticParams = async (): Promise<Params[]> => {
  const { totalCount } = await getBlogList({ page: 1, perPage: PER_PAGE });
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return Array.from({ length: totalPages }, (_, index) => ({
    id: String(index + 1),
  }));
};

export default async function Image({ params }: Props): Promise<ImageResponse> {
  const { id } = await params;
  const title = id === '1' ? siteConfig.title : `${siteConfig.title} - ${id}ページ目`;
  const backgroundImageSrc = await getOgBaseImageDataUrl();

  return new ImageResponse(
    <OgImage title={title} backgroundImageSrc={backgroundImageSrc} />,
    await createOgImageOptions(title),
  );
}
