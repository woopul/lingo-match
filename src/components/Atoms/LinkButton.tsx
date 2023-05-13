import clsx from 'clsx';
import NextLink from 'next/link';
import React from 'react';

export type LinkButtonProps = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  label?: string;
};

const LinkButton = ({ children, className, href, label }) => {
  return (
    <NextLink
      className={clsx(
        'text-white bg-primary-500 px-2 py-1 font-bold rounded-full no-underline text-center text-16 hover:bg-primary-600',
        className,
      )}
      href={href || '#'}
    >
      {label || children}
    </NextLink>
  );
};

export default LinkButton;
