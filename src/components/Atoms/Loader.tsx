import clsx from 'clsx';
import React from 'react';

const LoaderSizeStyleMap = {
  large: 'w-4 h-4',
  medium: 'w-3 h-3',
  small: 'w-2 h-2',
};

export type LoaderProps = {
  className?: string;
  size?: keyof typeof LoaderSizeStyleMap;
};

const Loader = ({ className, size = 'small' }: LoaderProps) => (
  <div
    className={clsx(
      'bg-transparent border-4 border-middleGrey rounded-full border-t-blue-50 animate-spin',
      LoaderSizeStyleMap[size],
      className,
    )}
  ></div>
);

export default Loader;
