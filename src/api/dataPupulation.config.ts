/* eslint-disable sort-keys */
export const getPlatformsDataConfig = {
  fields: [
    'priceAsNumber',
    'priceBeforeDiscountAsNumber',
    'shortDescription',
    'shortDescriptionMobile',
    'slug',
    'title',
    'currency',
  ],
  populate: {
    logo: {
      fields: ['url'],
    },
    labels: { fields: ['title'], populate: { icon: { fields: ['url'] } } },
  },
};
