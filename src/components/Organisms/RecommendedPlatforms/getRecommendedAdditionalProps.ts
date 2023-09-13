import { StrapiBlockType } from '@lingo-match/types/strapi';
import { pick } from 'lodash-es';

import { RecommendedPlatformsBlockType } from './RecommendedPlatforms';

export const getRecommendedPlatformProps = async (
  block: StrapiBlockType<RecommendedPlatformsBlockType>,
) => {
  const { __component, id } = block;

  return {
    __component,
    id,
    platforms: block.platforms.data.map((platform) =>
      pick(platform, ['id', 'name', 'slug', 'labels', 'logo', 'description', 'captionRecommended']),
    ),
  };
};
