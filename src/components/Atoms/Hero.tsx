import { Image } from '@lingo-match/components';
import { HeroDTO } from '@lingo-match/types/strapi/blocks';
import React from 'react';

const Hero = ({ description, imageDesktop, textColor, title }: HeroDTO) => {
  const CustomTag = title?.tagType || 'h2';
  const heroTextColorStyle = textColor ? { color: textColor } : {};
  return (
    <div className="w-full relative h-[24rem]">
      {imageDesktop.data && (
        <div className="h-[24rem] bg-primary-200 relative mt-2">
          <Image alt={''} className="object-cover" src={imageDesktop.data.attributes.url} />
        </div>
      )}
      {title && (
        <div
          className="absolute px-2 inset-0 flex flex-col justify-center items-center text-[#ffffff]"
          style={heroTextColorStyle}
        >
          <CustomTag className={title.titleSizeStyle}>{title.title}</CustomTag>
          {description && <p className="text-preamble text-white mt-2">{description}</p>}
        </div>
      )}
    </div>
  );
};

export default Hero;
