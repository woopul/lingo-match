import { LayoutConfigDTO } from '@lingo-match/components/Layout';
import { StrapiBlockType } from '@lingo-match/types/strapi/blocks';

type BaseStrapiAttributesType = {
  createdAt?: string;
  updatedAt?: number;
};

type MainStrapiAttributesType = {
  locale?: string;
  localizations?: string[];
  published_at?: string;
};

export type StrapiAdditionalAttributesType =
  | BaseStrapiAttributesType
  | (BaseStrapiAttributesType & MainStrapiAttributesType);

export type MainStrapiMetaType = {
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
};

export type BaseDT<DT> = DT & BaseStrapiAttributesType;
export type MainDT<DT> = DT & BaseStrapiAttributesType & MainStrapiAttributesType;

export type CustomResponseDataType<TExpected, TFallback = null> = Promise<
  | {
      data: TExpected;
      success: true;
    }
  | {
      data: TFallback;
      success: false;
    }
>;

export type BaseDataItem<DT> = {
  attributes: MainDT<DT> | BaseDT<DT>;
  id: number;
};

export type BaseResponseDataWrapper<DT> = {
  data: DT extends any[] ? Array<BaseDataItem<DT>> : BaseDataItem<DT>;
  meta?: MainStrapiMetaType;
};

export type BaseArrayDataWrapper<DT> = {
  data: Array<BaseDataItem<DT>> | null;
  meta?: MainStrapiMetaType | {};
};

export type BaseDataWrapper<DT> = {
  data: BaseDataItem<DT> | null;
  meta?: MainStrapiMetaType | {};
};

export type DataWrapper<DT> = {
  data: DT;
};

export type BaseGetStaticPropsType = {
  blocks?: StrapiBlockType[];
  layoutConfig: LayoutConfigDTO | {};
} & Record<any, any>;
