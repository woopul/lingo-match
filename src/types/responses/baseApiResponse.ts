import { LayoutConfigDTO } from '@lingo-match/components/Organisms/Layout';

export type BaseApiResponseType<BodyType = unknown> = {
  body: BodyType;
  error?: object;
  status: number;
};

export type BaseResponseDataType<DataType> = {
  data: {
    attributes: {
      createdAt?: string;
      locale?: string;
      publishedAt?: string;
      updatedAt: number;
    } & DataType;
    id: number;
  };
};

export type BaseGetStaticPropsType = {
  layoutConfig: LayoutConfigDTO | {};
} & Record<any, any>;
