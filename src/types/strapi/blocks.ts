import { BaseDataItem, BaseResponseDataWrapper } from '@lingo-match/types/strapi/baseApiResponse';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';

export type CategoryDTO = {
  name?: string;
  platforms?: BaseResponseDataWrapper<PlatformDTO[]>;
};

export type HeroDTO = {
  imageDesktop: BaseResponseDataWrapper<StrapiMediaType>;
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
  content?: string;
  createdAt?: string;
  locale?: string;
  publishedAt?: string;
  slug?: string;
  splash?: string;
  title?: string;
  updatedAt?: string;
};

export type HomePageDTO = {
  hero: HeroDTO;
  platformCard: PlatformCardDTO;
};

export type LabelDTO = {
  icon: BaseResponseDataWrapper<StrapiMediaType>;
  title: string;
};
