import { LayoutConfigDTO } from '@lingo-match/components/Layout';
import { LabelsContextType } from '@lingo-match/context/LabelsProvider/Context';
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

export type BaseDataItem<DT> = {
  attributes: MainDT<DT> | BaseDT<DT>;
  id: number;
};

export type BaseResponseDataWrapper<DT> = DT extends any[]
  ? BaseArrayDataWrapper<DT>
  : BaseDataWrapper<DT>;

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

// Type guards
export const isMainStrapiMetaType = (obj: any): obj is MainStrapiMetaType => {
  return 'pagination' in obj;
};

export type BaseGetStaticPropsType = {
  blocks?: StrapiBlockType[];
  layoutConfig: LayoutConfigDTO | {};
  sitewideLabels?: LabelsContextType;
} & Record<any, any>;

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
