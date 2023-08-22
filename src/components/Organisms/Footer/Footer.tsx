import { LinkIcon } from '@lingo-match/components';
import Logo from '@lingo-match/components/Atoms/Logo';
import { BaseDataItem } from '@lingo-match/types/strapi/baseApiResponse';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';
import clsx from 'clsx';

export type FooterColumnType = {
  align?: 'vertical' | 'horizontal';
  links?: {
    href?: string;
    icon?: {
      data: BaseDataItem<StrapiMediaType> | null;
    };
    label?: string;
  }[];
  title?: string;
};

export type FooterDTO = {
  footerColumns?: FooterColumnType[];
};

export type FooterProps = FooterDTO & {
  className?: string;
};

const Footer = ({ className, footerColumns }: FooterProps) => (
  <footer
    className={clsx(
      'bottom-0 z-10 w-full overflow-hidden bg-primary-500 text-white shadow-2xl',
      className,
    )}
  >
    <div className="mx-auto grid max-w-[144rem] grid-cols-5 px-8 py-2">
      <Logo className="self-center" src="/logo.svg" />
      {footerColumns?.map(({ align, links, title }) => (
        <div className="flex flex-col" key={`${title || ''}-${links?.length || 0}`}>
          <div className="mb-1">{title}</div>
          <div className={clsx('w-full', align === 'horizontal' && 'flex items-center gap-2')}>
            {links?.map((link) => {
              return (
                <LinkIcon
                  className="text-paragraph uppercase"
                  href={link.href || ''}
                  iconSrc={link.icon?.data?.attributes.url || ''}
                  key={`${link.href}-${link.label}`}
                  label={link.label || ''}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </footer>
);

export default Footer;
