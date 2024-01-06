import { BaseDataItem } from '@lingo-match/types/strapi/baseApiResponse';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';

import { FooterDesktop } from './components/FooterDesktop';
import { FooterMobile } from './components/FooterMobile';

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

export const Footer = ({ footerColumns }: FooterProps) => (
  <>
    <FooterMobile footerColumns={footerColumns} />
    <FooterDesktop footerColumns={footerColumns} />
  </>
);
