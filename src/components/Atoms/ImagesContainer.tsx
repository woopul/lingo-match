import { Image } from '@lingo-match/components';
import { BaseDataItem, DataWrapper } from '@lingo-match/types/strapi/baseApiResponse';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';
import { cn } from '@lingo-match/utlis/cn';
import React from 'react';

import ImageWithZoom from './ImageWithZoom';

export type ImagesContainerProps = {
  images: DataWrapper<Array<BaseDataItem<StrapiMediaType>>>;
};

const ImagesContainer = ({ images }: ImagesContainerProps) => {
  if (!images.data?.length) {
    return null;
  }

  // Slice images to limit maximum images to 2, as strapi doesn't allow to set that limit in admin panel for some again unknown reason
  const slicedImages = images.data.slice(0, 2);

  if (slicedImages.length === 1) {
    return (
      <div className="my-4 flex w-full gap-1">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image
            alt={slicedImages[0].attributes.alternativeText ?? ''}
            className="object-cover"
            src={slicedImages[0].attributes.url}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 flex w-full gap-1">
      {slicedImages.map((image) => (
        <div
          className={cn(
            'group relative  aspect-square w-full overflow-hidden rounded-2xl bg-primary-200',
          )}
          key={image.attributes.url}
        >
          <ImageWithZoom alt={image.attributes.alternativeText ?? ''} src={image.attributes.url} />
        </div>
      ))}
    </div>
  );
};

export default ImagesContainer;
