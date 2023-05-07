export type SeoDTO = {
  canonicalURL?: string;
  id: number;
  keywords?: string;
  metaDescription?: string;
  metaRobots?: string;
  metaTitle?: string;
  metaViewport?: string;
  // JSON string object
  structuredData?: string;
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
