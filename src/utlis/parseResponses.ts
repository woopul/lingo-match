import { BaseResponseDataType } from '@lingo-match/types/strapi/baseApiResponse';

const parseToDataResponse = <T>(data: BaseResponseDataType<T>): T => {
  return data.data.attributes as T;
};
