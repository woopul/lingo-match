import { Link } from '@lingo-match/components';
import { LinkDTO } from '@lingo-match/components/Atoms/Link';
import clsx from 'clsx';
import Image from 'next/image';

import footerConfig from './footerConfig';

export type FooterColumnType = {
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

const Footer = ({ className, columns = footerConfig }: FooterProps) => (
  <footer className={clsx('bg-primary-500 w-full z-10 bottom-0 shadow-2xl text-white', className)}>
    <div className="py-2 px-5 mx-auto max-w-[144rem] grid grid-cols-5">
      {columns?.map(({ links, title }) => (
        <div className="flex flex-col" key={title}>
          <div className="mb-1">{title}</div>
          {links?.map((link) => {
            if (link.srcUrl) {
              return <Image alt="" key={link.srcUrl} src={link.srcUrl} />;
            }
            return (
              <Link
                className="text-paragraph uppercase"
                key={link.path}
                label={link.label || ''}
                path={link.path || ''}
              />
            );
          })}
        </div>
      ))}
    </div>
  </footer>
);

export default Footer;
