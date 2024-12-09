import { Image } from '@lingo-match/components';
import React, { useState } from 'react';
import { FaSearchPlus } from 'react-icons/fa';

type ImageWithZoomProps = {
  alt: string;
  className?: string;
  src: string;
};

const ImageWithZoom = ({ alt, className, src }: ImageWithZoomProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoom = () => {
    document.body.style.overflow = 'hidden';
    setIsZoomed(true);
  };

  const handleClose = () => {
    document.body.style.overflow = 'auto';
    setIsZoomed(false);
  };

  return (
    <>
      <Image alt={alt} className="object-cover" src={src} />
      <div
        className="absolute bottom-2 right-2 hidden cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50 p-2 group-hover:flex"
        onClick={handleZoom}
      >
        <FaSearchPlus className="text-white" />
      </div>

      {isZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative h-[70vh] w-full">
            <button
              className="hovercursor-pointer absolute right-4 top-0 z-50 text-42 leading-[1] text-white"
              onClick={handleClose}
            >
              &times;
            </button>
            <Image alt={alt} className="object-contain" src={src} />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageWithZoom;
