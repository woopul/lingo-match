import clsx from 'clsx';
import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

export type LinkDTO = {
  label?: string;
  path: string;
};

export type LinkProps = LinkDTO & {
  className?: string;
};

const Link = ({ children, className, label, path }: PropsWithChildren<LinkProps>) => (
  <NextLink className={clsx('styled-link text-preamble', className)} href={path}>
    {children || label}
  </NextLink>
);

export default Link;
