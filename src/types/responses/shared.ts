type BaseDataWrapperType<DataType> = {
  id: number;
} & DataType;

export type ComponentDataWrapperType<ComponentType = unknown> = {
  data: {
    attributes: ComponentType;
    id: number;
  };
};

type MediaDataSizeType = {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: null;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  size: number;
  url: string;
  width: number;
};

export type MediaDataType = {
  alternativeText: null;
  caption: null;
  createdAt: string;
  ext: string;
  formats: {
    medium: MediaDataSizeType;
    small: MediaDataSizeType;
    thumbnail: MediaDataSizeType;
  };
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  size: number;
  updatedAt: string;
  url: string;
  width: number;
};
