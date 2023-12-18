import { Image } from '@lingo-match/components';
import { cn } from '@lingo-match/utlis/cn';
import React from 'react';

export type IconImageProps = {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  src: string;
};

const MapIconSizeToClass = {
  large: 'w-4 h-4',
  medium: 'w-3 h-3',
  small: 'w-[2rem] h-2',
};

const IconImage = ({ className, size = 'small', src }: IconImageProps) => {
  const iconSize = MapIconSizeToClass[size];
  return (
    <div className={cn('relative', iconSize, className)}>
      <Image alt={''} src={src} />
    </div>
  );
};

export default IconImage;
