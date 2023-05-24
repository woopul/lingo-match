import {
  BaseArrayDataWrapper,
  BaseDataWrapper,
  BaseResponseDataWrapper,
} from '@lingo-match/types/strapi/baseApiResponse';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';

// TODO clean up, restructure and check those types

export type BlockWrapper<T = any> = T & {
  __component: string;
  id: string;
};

export type BlocksType = BlockWrapper[] | [];

type TagType = {
  name: string;
  type: string;
};

export type CategoryDTO = {
  name?: string;
  platforms?: BaseResponseDataWrapper<PlatformDTO[]>;
};

export type HeroDTO = {
  description?: string;
  id: number;
  imageDesktop: BaseResponseDataWrapper<StrapiMediaType>;
  textColor?: string;
  title?: TitleDTO;
};

export type HorizontalAlignmentType = 'left' | 'center' | 'right';
export type TextSizeStyleType =
  | 'text-hero'
  | 'text-h1'
  | 'text-h2'
  | 'text-h3'
  | 'text-h4'
  | 'text-h5';

export type DescriptionSizeStyleType = 'S' | 'M' | 'L' | 'XL';

export type TitleDTO = {
  horizontalAlignment: HorizontalAlignmentType;
  id: number;
  tagType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  title: string;
  titleSizeStyle: TextSizeStyleType;
};

export type DescriptionDTO = {
  description?: string;
  descriptionRichText?: string;
  descriptionSizeStyle: DescriptionSizeStyleType;
  id: number;
  richText?: string;
  textColor?: string;
};

export type PlatformDTO = {
  categories?: CategoryDTO[];
  description?: string;
  labels: BaseResponseDataWrapper<LabelDTO[]> | null;
  logo: BaseResponseDataWrapper<StrapiMediaType>;
  priceAsNumber: number;
  priceBeforeDiscountAsNumber?: number;
  rating?: number;
  shortDescription?: string;
  slug: string;
  title: string;
};

export type PlatformCardDTO = {
  basicVersionLabel: string;
  basicVersionPayedLabel: string;
  navigateToPlatformButtonLabel: string;
  priceForShortLabel: string;
  pricePerMonthLabel: string;
};

export type BlogPostDTO = {
  author: string;
  blocks: BlocksType;
  blogCategories: BaseArrayDataWrapper<TagType>;
  content?: string;
  createdAt?: string;
  locale?: string;
  publishedAt?: string;
  shortDescription: string;
  slug: string;
  splash: BaseDataWrapper<StrapiMediaType>;
  title?: string;
  updatedAt?: string;
};

export type HomePageDTO = {
  blocks: BlockWrapper[];
  hero: HeroDTO;
  platformCard: PlatformCardDTO;
};

export type LabelDTO = {
  icon: BaseResponseDataWrapper<StrapiMediaType>;
  title: string;
};
