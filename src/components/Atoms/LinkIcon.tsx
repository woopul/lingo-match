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
  <NextLink className={clsx('text-preamble flex gap-1 no-underline', className)} href={href || '/'}>
    {iconSrc && (
      <div className="relative h-[2.1rem] w-[2.1rem]">
        <Image alt="" src={iconSrc} />
      </div>
    )}
    {label && <div>{label}</div>}
  </NextLink>
);

export default LinkIcon;
