import { LayoutConfigDTO } from '@lingo-match/components/Organisms/Layout';

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

export type BaseDT<DT> = DT & BaseStrapiAttributesType;
export type MainDT<DT> = DT & BaseStrapiAttributesType & MainStrapiAttributesType;

export type BaseDataItem<DT> = {
  attributes: MainDT<DT> | BaseDT<DT>;
  id: number;
};

export type BaseResponseDataWrapper<DT> = {
  data: DT extends any[] ? Array<BaseDataItem<DT>> : BaseDataItem<DT>;
  meta?: MainStrapiMetaType | {};
};

export type BaseGetStaticPropsType = {
  layoutConfig: LayoutConfigDTO | {};
} & Record<any, any>;
