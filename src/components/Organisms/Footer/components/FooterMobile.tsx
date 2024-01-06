import { LinkIcon } from '@lingo-match/components';
import { BaseDataItem } from '@lingo-match/types/strapi/baseApiResponse';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';
import { cn } from '@lingo-match/utlis/cn';

import AccordionItem from '../../AccordionItem';

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
    className={cn(
      'desktop:hidden',
      'bottom-0 z-10 w-full overflow-hidden bg-primary-500 p-2 text-white shadow-2xl',
      className,
    )}
  >
    <div className="flex max-w-[144rem] flex-col">
      {footerColumns?.map(({ align, links, title }, i) => (
        <AccordionItem bold className="px-0 py-0" key={title} title={title}>
          <div
            className={cn(
              'flex  gap-1 pb-1',
              align === 'horizontal' ? 'flex-row items-center gap-2' : 'flex-col',
            )}
            key={`${title || ''}-${links?.length || 0}-${i}`}
          >
            {links?.map((link, i) => {
              return (
                <LinkIcon
                  className="text-paragraph px-1 uppercase"
                  href={link.href || ''}
                  iconSrc={link.icon?.data?.attributes.url || ''}
                  key={`${link.href}-${link.label || ''}-${i}`}
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
