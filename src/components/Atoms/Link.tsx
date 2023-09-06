import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { CSSProperties, PropsWithChildren } from 'react';

export type LinkDTO = {
  label?: string;
  path?: string;
  textColor: string | null;
};

export type LinkProps = NextLinkProps & {
  className?: string;
  label?: string;
  style?: CSSProperties;
  variant?: 'styled' | 'default';
};

const Link = ({
  children,
  className,
  href,
  label,
  style,
  variant = 'default',
}: PropsWithChildren<LinkProps>) => (
  <NextLink
    as={href}
    className={clsx(
      'text-preamble no-underline',
      { 'styled-link': variant === 'styled' },
      className,
    )}
    href={href || '/'}
    style={style}
  >
    {children || label}
  </NextLink>
);

export default Link;
