import { LinkIcon } from '@lingo-match/components';
import Logo from '@lingo-match/components/Atoms/Logo';
import { BaseDataItem } from '@lingo-match/types/strapi/baseApiResponse';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';
import clsx from 'clsx';

import AccordionItem from '../AccordionItem';

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

export const FooterMobile = ({ className, footerColumns }: FooterProps) => (
  <footer
    className={clsx(
      'desktop:hidden',
      'bottom-0 z-10 w-full overflow-hidden bg-primary-500 p-2 text-white shadow-2xl',
      className,
    )}
  >
    <div className="flex max-w-[144rem] flex-col">
      {footerColumns?.map(({ align, links, title }) => (
        <AccordionItem bold className="px-0 py-0" key={title} title={title}>
          <div
            className={clsx(
              'flex  gap-1 pb-1',
              align === 'horizontal' ? 'flex-row items-center gap-2' : 'flex-col',
            )}
          >
            {links?.map((link) => {
              return (
                <LinkIcon
                  className="text-paragraph px-1 uppercase"
                  href={link.href || ''}
                  iconSrc={link.icon?.data?.attributes.url || ''}
                  key={`${link.href}-${link.label}`}
                  label={link.label || ''}
                />
              );
            })}
          </div>
        </AccordionItem>
      ))}
    </div>
  </footer>
);