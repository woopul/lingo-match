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

export const getPlatformBySlugDataConfig = {
  populate: {
    logo: {
      fields: ['url'],
    },
    labels: { fields: ['title'], populate: { icon: { fields: ['url'] } } },
    blocks: {
      populate: '*',
    },
    recommendedPlatforms: {
      populate: {
        platforms: {
          // fields: ['title', 'price', 'priceAsNumber', 'priceBeforeDiscountAsNumber', 'slug'],
          populate: {
            logo: {
              fields: ['url'],
            },
            labels: { fields: ['title'] },
          },
        },
      },
    },
    pricingBlock: {
      populate: ['subscriptionType', 'subscriptionType.subscription'],
    },
  },
};
