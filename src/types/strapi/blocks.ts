import {
  BaseStrapiDataWrapperType,
  MainStrapiDataWrapperType,
} from '@lingo-match/types/strapi/baseApiResponse';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';

export type CategoryDTO = {
  name?: string;
  platforms?: MainStrapiDataWrapperType<PlatformDTO>;
};

export type PlatformDTO = {
  categories?: CategoryDTO[];
  description?: string;
  labels?: string;
  logo?: BaseStrapiDataWrapperType<StrapiMediaType>[];
  name?: string;
  price?: string;
  rating?: number;
  slug?: string;
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
