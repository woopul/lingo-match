import { Image } from '@lingo-match/components';
import { BaseDataItem, DataWrapper } from '@lingo-match/types/strapi/baseApiResponse';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';
import React from 'react';

export type ImagesContainerProps = {
  images: DataWrapper<Array<BaseDataItem<StrapiMediaType>>>;
};

const ImagesContainer = ({ images }: ImagesContainerProps) => {
  if (!images.data?.length) {
    return null;
  }

  return (
    <div className="flex w-full gap-1">
      {images.data.map((image) => (
        <div
          className="relative aspect-square w-full overflow-hidden rounded-md bg-primary-200"
          key={image.attributes.url}
        >
          <Image
            alt={image.attributes.alternativeText ?? ''}
            className="object-cover"
            src={image.attributes.url}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesContainer;
