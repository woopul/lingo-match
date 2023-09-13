import {
  BaseDataItem,
  BlockType,
  PlatformDTOMapToRecommendedCard,
} from '@lingo-match/types/strapi';

export type RecommendedPlatformsBlockType = BlockType & {
  platforms: {
    data: Array<BaseDataItem<PlatformDTOMapToRecommendedCard>>;
  };
  title: string;
};

const RecommendedPlatforms = ({ platforms, title }: RecommendedPlatformsBlockType) => {
  return (
    <div>
      <h4>{title}</h4>
      {platforms.data.map((item, i) => (
        <h4 key={i}>{item.attributes.title}</h4>
      ))}
    </div>
  );
};

export default RecommendedPlatforms;
