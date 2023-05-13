import { Image } from '@lingo-match/components';
import { HeroDTO } from '@lingo-match/types/strapi/blocks';
import React from 'react';

const Hero = ({ imageDesktop }: HeroDTO) => {
  if (!imageDesktop) {
    return null;
  }

  return (
    <div className="w-full h-[24rem] bg-primary-200 relative mt-2">
      <Image alt={''} className="object-cover" src={imageDesktop.data.attributes.url} />
    </div>
  );
};

export default Hero;
