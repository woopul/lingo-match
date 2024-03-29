import { getCurrenciesExchangeRate } from '@lingo-match/api/currency';
import { getLabels } from '@lingo-match/api/strapi';
import {
  BaseArrayDataWrapper,
  PlatformDTO,
  PlatformDTOMapToRecommendedCard,
  StrapiBlockType,
  TranslationsDTO,
} from '@lingo-match/types/strapi';
import { strapiDataArray } from '@lingo-match/utlis';
import { pick } from 'lodash-es';

import { RecommendedPlatformsBlockType } from './RecommendedPlatforms';

export const getRecommendedPlatformProps = async (
  block: StrapiBlockType<RecommendedPlatformsBlockType> & {
    platforms: BaseArrayDataWrapper<PlatformDTOMapToRecommendedCard[]>;
  },
) => {
  const { __component, id, title } = block;
  const { data: currenciesExchangeRate } = await getCurrenciesExchangeRate();

  const platforms = strapiDataArray<PlatformDTOMapToRecommendedCard[]>(block.platforms) || [];

  return {
    __component,
    currenciesExchangeRate,
    id,
    // todo: think about adding separate directory for data mappers and unify them with strapi population(?)
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
