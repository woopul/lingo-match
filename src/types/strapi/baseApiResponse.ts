import { LayoutConfigDTO } from '@lingo-match/components/Organisms/Layout';
import { SeoDTO } from '@lingo-match/types/strapi/shared';

export type BaseApiResponseType<BodyType = unknown> = {
  body: BodyType;
  error?: object;
  status: number;
};

type BaseStrapiAttributesType = {
  createdAt?: string;
  updatedAt?: number;
};

type MainStrapiAttributesType = {
  locale?: string;
  localizations?: string[];
  published_at?: string;
};

type MainStrapiMetaType = {
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
};

export type BaseStrapiDataWrapperType<DataType> = {
  attributes: (BaseStrapiAttributesType & DataType) | (BaseStrapiAttributesType & DataType)[];
  id: number;
};

export type MainStrapiDataWrapperType<DataType> = {
  attributes: BaseStrapiAttributesType & MainStrapiAttributesType & SeoDTO & DataType;
  id: number;
};

export type BaseResponseDataType<DataType> = {
  data: MainStrapiDataWrapperType<DataType> | MainStrapiDataWrapperType<DataType>[];
  meeta?: MainStrapiMetaType;
};

export type BaseGetStaticPropsType = {
  layoutConfig: LayoutConfigDTO | {};
} & Record<any, any>;
