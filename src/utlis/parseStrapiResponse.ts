import {
  BaseResponseDataType,
  MainStrapiDataWrapperType,
} from '@lingo-match/types/strapi/baseApiResponse';

export const parseStrapiResponseToData = <T>({ data }: BaseResponseDataType<T>): T | T[] => {
  if (Array.isArray(data)) {
    return data?.map((dataItem) => parseStrapiDataType(dataItem)) as T[];
  }
  return data.attributes as T;
};

const parseStrapiDataType = <T>(data: MainStrapiDataWrapperType<T>): T => data.attributes as T;
