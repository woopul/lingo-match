import { BaseDataItem, BaseResponseDataWrapper } from '@lingo-match/types/strapi/baseApiResponse';

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
  item: BaseResponseDataWrapper<Array<BaseDataItem<T>>> | BaseResponseDataWrapper<BaseDataItem<T>>,
): T | T[] => {
  if (Array.isArray(item.data)) {
    return (item.data as Array<BaseDataItem<T>>).map((dataItem) => dataItem.attributes) as T[];
  }
  return (item.data as BaseDataItem<T>).attributes as T;
};
