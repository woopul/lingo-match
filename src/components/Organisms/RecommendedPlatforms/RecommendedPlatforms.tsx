import { PlatformDTO } from '@lingo-match/types/strapi';

export type RecommendedPlatformsProps = {
  items: PlatformDTO[];
};

export const RecommendedPlatforms = ({ items }: RecommendedPlatformsProps) => {
  return items?.map((item, i) => <div key={item.title || i}></div>);
};
