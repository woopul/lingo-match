import clsx from 'clsx';
import NextImage, { ImageProps } from 'next/image';
import { useState } from 'react';

const Image = ({ fill = true, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <NextImage fill={fill} onLoadingComplete={() => setLoading(false)} {...rest} />
      <div
        className={clsx(
          'absolute backdrop-blur-lg duration-300',
          isLoading ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      />
    </>
  );
};

export default Image;
