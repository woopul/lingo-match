import clsx from 'clsx';
import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

export type LinkDTO = {
  label?: string;
  path?: string;
};

export type LinkProps = LinkDTO & {
  className?: string;
  variant?: 'styled' | 'default';
};

const Link = ({
  children,
  className,
  label,
  path,
  variant = 'default',
}: PropsWithChildren<LinkProps>) => (
  <NextLink
    className={clsx(
      'text-preamble no-underline',
      { 'styled-link': variant === 'styled' },
      className,
    )}
    href={path || '/'}
  >
    {children || label}
  </NextLink>
);

export default Link;
