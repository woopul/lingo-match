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
