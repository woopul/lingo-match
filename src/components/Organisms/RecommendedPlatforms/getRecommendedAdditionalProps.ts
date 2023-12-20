import { getCurrenciesExchangeRate } from '@lingo-match/api/currency';
import { getLabels } from '@lingo-match/api/strapi';
import {
  BaseArrayDataWrapper,
  PlatformDTO,
  PlatformDTOMapToRecommendedCard,
  StrapiBlockType,
  TranslationsDTO,
} from '@lingo-match/types/strapi';
import { strapiData, strapiDataArray } from '@lingo-match/utlis';
import { pick } from 'lodash-es';

import { RecommendedPlatformsBlockType } from './RecommendedPlatforms';

export const getRecommendedPlatformProps = async (
  block: StrapiBlockType<RecommendedPlatformsBlockType> & {
    platforms: BaseArrayDataWrapper<PlatformDTOMapToRecommendedCard[]>;
  },
) => {
  const { __component, id, title } = block;
  const { data: currenciesExchangeRate } = await getCurrenciesExchangeRate();

  const labels = (await getLabels({ fields: ['recommendedCard'] })) as TranslationsDTO;
  const platforms = strapiDataArray<PlatformDTOMapToRecommendedCard[]>(block.platforms) || [];

  return {
    __component,
    currenciesExchangeRate,
    id,
    labels: labels?.recommendedCard || {},
    platforms: platforms?.map((platform) =>
      pick(platform, [
        'id',
        'name',
        'slug',
        'labels',
        'title',
        'logo',
        'description',
        'price',
        'priceCurrency',
        'captionRecommended',
        'priceAsNumber',
        'priceBeforeDiscountAsNumber',
        'mainCurrencyForThisMarket',
        'currency',
      ]),
    ),
    title,
  };
};
