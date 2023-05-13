import { Image } from '@lingo-match/components';
import React from 'react';

export type HeroProps = {
  desktopImageSrc?: string;
};

const Hero = ({ desktopImageSrc }: HeroProps) => {
  if (!desktopImageSrc) {
    return null;
  }

  return (
    <div className="w-full h-[24rem] bg-primary-200 relative mt-2">
      <Image alt={''} className="object-cover" src={desktopImageSrc} />
    </div>
  );
};

export default Hero;
