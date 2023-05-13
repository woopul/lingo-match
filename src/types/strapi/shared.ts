import { BaseStrapiDataWrapperType } from '@lingo-match/types/strapi/baseApiResponse';

type SeoMetaSocialType = {
  description: string;
  id: number;
  socialNetwork: string;
  title: string;
};

export type SeoDTO = {
  canonicalURL?: string;
  id: number;
  keywords?: string;
  metaDescription?: string;
  metaImage?: {
    data: BaseStrapiDataWrapperType<StrapiMediaType>;
  };
  metaRobots?: string;
  metaSocial: SeoMetaSocialType[] | [];
  metaTitle?: string;
  metaViewport?: string;
  // JSON string object
  structuredData?: string;
};

type StrapiMediaSizeType = {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  size: number;
  url: string;
  width: number;
};

export type StrapiMediaType = {
  alternativeText?: string;
  caption?: string;
  createdAt?: string;
  ext?: string;
  formats?: {
    medium?: StrapiMediaSizeType;
    small?: StrapiMediaSizeType;
    thumbnail?: StrapiMediaSizeType;
  };
  hash?: string;
  height?: number;
  mime?: string;
  name?: string;
  previewUrl?: string;
  provider?: string;
  provider_metadata?: {
    public_id?: string;
    resource_type?: string;
  };
  size?: number;
  updatedAt?: string;
  url: string;
  width?: number;
};
