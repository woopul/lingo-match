type RemoveDataType = Record<string, any> | Array<Record<string, any>>;

const removeKeys = (obj: RemoveDataType, keysToRemove: string[]): void => {
  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      removeKeys(item, keysToRemove);
    });
  } else {
    keysToRemove.forEach((keyToRemove) => {
      if (obj.hasOwnProperty(keyToRemove)) {
        delete obj[keyToRemove];
      }
    });
    for (let key in obj) {
      if (obj[key] !== null && typeof obj[key] === 'object') {
        removeKeys(obj[key], keysToRemove);
      }
    }
  }
};

export const cleanStrapiData = (data: RemoveDataType | null) => {
  if (!data) {
    return data;
  }

  const keysToRemove = ['createdAt', 'id', 'publishedAt', 'updatedAt', 'locale'];

  removeKeys(data, keysToRemove);

  return data;
};
