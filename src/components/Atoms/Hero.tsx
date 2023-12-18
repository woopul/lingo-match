import { Image } from '@lingo-match/components';
import { HeroDTO } from '@lingo-match/types/strapi/blocks';
import { cn } from '@lingo-match/utlis/cn';
import React from 'react';

const Hero = ({ description, imageDesktop, textColor, title }: HeroDTO) => {
  const CustomTag = title?.tagType || 'h2';
  const heroTextColorStyle = textColor ? { color: textColor } : {};
  return (
    <div className="relative h-[24rem] w-full">
      {imageDesktop.data && (
        <div className="relative mt-2 h-[24rem] bg-primary-200">
          <Image alt={''} className="object-cover" src={imageDesktop.data.attributes.url} />
        </div>
      )}
      {title && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-2 text-[#ffffff]"
          style={heroTextColorStyle}
        >
          <CustomTag className={cn(title.titleSizeStyle, 'text-center')}>{title.title}</CustomTag>
          {description && <p className="text-preamble mt-2 text-white">{description}</p>}
        </div>
      )}
    </div>
  );
};

export default Hero;
