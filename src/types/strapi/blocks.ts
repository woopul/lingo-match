import {
  BaseArrayDataWrapper,
  BaseDataWrapper,
  BaseResponseDataWrapper,
  StrapiAdditionalAttributesType,
} from '@lingo-match/types/strapi/baseApiResponse';
import { SUPPORTED_CURRENCIES } from '@lingo-match/types/strapi/custom';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';

// TODO clean up, restructure and check those types

export type BlockType = {
  __component: string;
  id: string;
};

export type StrapiBlockType<T = Record<string, any>> = {
  __component: string;
  id: string;
} & T;

export type StrapiBlocksType = StrapiBlockType[];

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
  descriptionText: string;
  id: number;
  richText?: string;
  textColor?: string;
};

export type PlatformDTOMapToRecommendedCard = Pick<
  PlatformDTO,
  | 'title'
  | 'captionRecommended'
  | 'currency'
  | 'mainCurrencyForThisMarket'
  | 'shortDescription'
  | 'shortDescriptionMobile'
  | 'labels'
  | 'slug'
  | 'logo'
  | 'priceAsNumber'
  | 'priceBeforeDiscountAsNumber'
>;

export type PlatformDTOMapToMainCard = Pick<
  PlatformDTO,
  | 'title'
  | 'currency'
  | 'mainCurrencyForThisMarket'
  | 'shortDescription'
  | 'shortDescriptionMobile'
  | 'labels'
  | 'slug'
  | 'logo'
  | 'priceAsNumber'
  | 'priceBeforeDiscountAsNumber'
>;

export type PlatformDTO = StrapiAdditionalAttributesType & {
  blocks: StrapiBlockType[];
  captionRecommended?: string;
  categories?: CategoryDTO[];
  currency?: SUPPORTED_CURRENCIES;
  description?: string;
  detailedDescription?: string;
  labels: BaseArrayDataWrapper<LabelDTO>;
  logo: BaseResponseDataWrapper<StrapiMediaType>;
  mainCurrencyForThisMarket: SUPPORTED_CURRENCIES;
  priceAsNumber: number;
  priceBeforeDiscountAsNumber?: number;
  rating?: number;
  recommendedPlatforms?: {
    platforms: PlatformDTOMapToRecommendedCard[];
    title: string;
  };
  shortDescription?: string;
  shortDescriptionMobile?: string;
  slug: string;
  title: string;
};

export type TranslationsDTO = {
  [key: string]: Record<string, string>;
};

export type PlatformCardConfigDTO = {
  basicVersionLabel: string;
  basicVersionPayedLabel: string;
  navigateToPlatformButtonLabel: string;
  paymentInForeignCurrencyLabel: string;
  priceForShortLabel: string;
  pricePerMonthLabel: string;
};

export type BlogPostDTO = {
  author: string;
  blocks: StrapiBlockType[];
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

export type TagDTO = {
  name: string;
  type: string;
};

export type FilterAccordionDTO = {
  expanded: boolean;
  icon: BaseDataWrapper<StrapiMediaType>;
  id: number;
  positionReversed: boolean;
  shouldBeExpandable: boolean;
  tags: BaseArrayDataWrapper<TagDTO>;
  title: string;
  variant: 'default' | 'toggle' | 'icon' | 'label';
};

export type PlatformNotFoundDTO = {
  description: string;
  imageSrc: BaseDataWrapper<StrapiMediaType>;
  subtitle: string;
  title: string;
};

export type HomePageDTO = {
  blocks: StrapiBlockType[];
  hero: HeroDTO;
  mainFilters: FilterAccordionDTO[] | [];
  paginationItemsPerPage: number;
  platformCard: PlatformCardConfigDTO;
  platformNotFound: PlatformNotFoundDTO;
};

export type LabelDTO = {
  icon: BaseResponseDataWrapper<StrapiMediaType>;
  title: string;
};
