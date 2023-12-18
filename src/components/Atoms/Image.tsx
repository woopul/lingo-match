import { cn } from '@lingo-match/utlis/cn';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useState } from 'react';

export type ImageProps = NextImageProps & {
  className?: string;
};

const Image = ({ className, fill = true, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <NextImage
        className={cn(className || 'object-contain')}
        fill={fill}
        onLoadingComplete={() => setLoading(false)}
        {...rest}
      />
      <div
        className={cn(
          'absolute backdrop-blur-lg duration-300',
          isLoading ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      />
    </>
  );
};

export default Image;
