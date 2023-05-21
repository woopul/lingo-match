import { Image } from '@lingo-match/components';
import { BaseDataItem, DataWrapper } from '@lingo-match/types/strapi/baseApiResponse';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';
import React from 'react';

export type ImagesContainerProps = {
  images: DataWrapper<Array<BaseDataItem<StrapiMediaType>>>;
};

const ImagesContainer = ({ images }: ImagesContainerProps) => {
  if (!images.data.length) {
    return null;
  }

  return (
    <div className="w-full flex gap-1">
      {images.data.map((image) => (
        <div
          className="w-full aspect-square bg-primary-200 relative rounded-md overflow-hidden"
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
