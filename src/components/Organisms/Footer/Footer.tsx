import { Link } from '@lingo-match/components';
import { Image } from '@lingo-match/components';
import Logo from '@lingo-match/components/Atoms/Logo';
import clsx from 'clsx';

import footerConfig from './footerConfig';

export type FooterColumnType = {
  align?: 'bottom' | 'top' | 'center';
  links?: {
    label?: string;
    path?: string;
    srcUrl?: string;
  }[];
  srcUrl?: string;
  title?: string;
};

export type FooterProps = {
  className?: string;
  columns?: FooterColumnType[];
};

const Footer = ({ className, columns = footerConfig as FooterColumnType[] }: FooterProps) => (
  <footer className={clsx('bg-primary-500 w-full z-10 bottom-0 shadow-2xl text-white', className)}>
    <div className="py-2 px-8 mx-auto max-w-[144rem] grid grid-cols-5">
      {columns?.map(({ align, links, srcUrl, title }) => (
        <div className={clsx('flex flex-col', align === 'center' && 'justify-center')} key={title}>
          <div className="mb-1">{title}</div>
          {srcUrl && <Logo src={srcUrl} />}
          {links?.map((link) => {
            return (
              <Link
                className="text-paragraph uppercase"
                href={link.path || ''}
                key={`${link.path}-${link.label}`}
                label={link.label || ''}
              />
            );
          })}
        </div>
      ))}
    </div>
  </footer>
);

export default Footer;
