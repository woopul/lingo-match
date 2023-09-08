import { PlatformDTOMapToRecommendedCard } from '@lingo-match/types/strapi';
import { pick } from 'lodash-es';

export const getRecommendedPlatformProps = (block: PlatformDTOMapToRecommendedCard[]) => {
  return {
    // ...pick(platform, [
    //   'id',
    //   'name',
    //   'slug',
    //   'labels',
    //   'logo',
    //   'description',
    //   'captionRecommended',
    // ]),
  };
};
