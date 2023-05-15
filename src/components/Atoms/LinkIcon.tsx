import { Image } from '@lingo-match/components';
import clsx from 'clsx';
import NextLink from 'next/link';

export type LinkIconProps = {
  className?: string;
  href?: string;
  iconSrc: string;
  label?: string;
};

const LinkIcon = ({ className, href, iconSrc, label }: LinkIconProps) => (
  <NextLink className={clsx('text-preamble no-underline flex gap-1', className)} href={href || '/'}>
    {iconSrc && (
      <div className="w-[2.1rem] h-[2.1rem] relative">
        <Image alt="" src={iconSrc} />
      </div>
    )}
    {label && <div>{label}</div>}
  </NextLink>
);

export default LinkIcon;
