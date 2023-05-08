import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export type LinkDTO = {
  label?: string;
  path?: string;
};

export type LinkProps = NextLinkProps & {
  className?: string;
  label?: string;
  variant?: 'styled' | 'default';
};

const Link = ({
  children,
  className,
  href,
  label,
  variant = 'default',
}: PropsWithChildren<LinkProps>) => (
  <NextLink
    className={clsx(
      'text-preamble no-underline',
      { 'styled-link': variant === 'styled' },
      className,
    )}
    href={href || '/'}
  >
    {children || label}
  </NextLink>
);

export default Link;
