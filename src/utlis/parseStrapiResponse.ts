import {
  BaseArrayDataWrapper,
  BaseDataItem,
  BaseDataWrapper,
  BaseResponseDataWrapper,
  MainStrapiMetaType,
} from '@lingo-match/types/strapi/baseApiResponse';

export const parseStrapiResponseToData = <T>(
  item: BaseResponseDataWrapper<T> | null,
): T | T[] | null => {
  if (!item?.data) {
    return null;
  }
  if (Array.isArray(item.data)) {
    return (item.data as Array<BaseDataItem<T>>).map((dataItem) => dataItem.attributes) as T[];
  }
  return (item.data as BaseDataItem<T>).attributes as T;
};

// TODO refactor this function to take proper generic type and return type feedback
export const strapiData = <T>(
  item: BaseDataWrapper<T> | BaseArrayDataWrapper<T>,
): T | T[] | null => {
  if (!item?.data) {
    return null;
  }
  if (Array.isArray(item.data)) {
    return item.data.map((dataItem) => dataItem.attributes);
  }
  return item.data.attributes;
};

export const strapiDataArray = <T>(item: BaseArrayDataWrapper<T>): T[] => {
  if (!item?.data || !Array.isArray(item.data)) {
    return [];
  }
  return item.data.map((dataItem) => dataItem.attributes);
};

export const extractPaginationData = <DT>(
  item: BaseDataWrapper<DT> | BaseArrayDataWrapper<DT>,
): MainStrapiMetaType['pagination'] | {} => {
  const meta = item.meta as MainStrapiMetaType | null;
  return meta?.pagination || {};
};
