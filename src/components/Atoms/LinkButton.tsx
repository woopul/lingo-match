import { cn } from '@lingo-match/utlis/cn';
import NextLink from 'next/link';
import React from 'react';

export type LinkButtonProps = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  label?: string;
};

const LinkButton = ({ children, className, href, label }: LinkButtonProps) => {
  return (
    <NextLink
      className={cn(
        'rounded-full bg-primary-500 px-2 py-1 text-center text-16 font-bold text-white no-underline hover:bg-primary-600',
        className,
      )}
      href={href || '#'}
    >
      {label || children}
    </NextLink>
  );
};

export default LinkButton;
