import { CurrencyResponseType } from '@lingo-match/api/currency';
import { getLayoutConfig, getPlatformBySlug } from '@lingo-match/api/strapi';
import { Image, RecommendedPlatforms, Spacer } from '@lingo-match/components';
import { PrettyJSON } from '@lingo-match/components';
import Label from '@lingo-match/components/Atoms/Label';
import BlockRenderer from '@lingo-match/components/BlockRenderer';
import { RecommendedPlatformsBlockType } from '@lingo-match/components/Organisms/RecommendedPlatforms/RecommendedPlatforms';
import { getPropsConfig } from '@lingo-match/config/getProps.config';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import { placeholderSrc } from '@lingo-match/constants/urls';
import withLayout from '@lingo-match/containers/withLayout';
import { LabelDTO, PlatformDTO } from '@lingo-match/types/strapi';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { extendBlockData, strapiData } from '@lingo-match/utlis';
import { cn } from '@lingo-match/utlis/cn';
import { GetStaticProps } from 'next';

export const getStaticPaths = async () => ({
  fallback: 'blocking',
  paths: [],
});

export const getStaticProps: GetStaticProps<BaseGetStaticPropsType> = async (context) => {
  const [layoutConfig, platform] = await Promise.all([
    getLayoutConfig(),
    getPlatformBySlug(context.params?.slug as string) as Promise<PlatformDTO>,
  ]);

  // extract and remove blocks from platform data as theire will be used in nested component
  const blocks = JSON.parse(JSON.stringify(platform?.blocks || null));
  delete platform.blocks;

  // extend all block list data if needed
  const extendedBlocks = await extendBlockData({
    blocks,
    getPropsConfig,
  });

  // extend recommended platfor block
  const recommendedPlatforms = await extendBlockData({
    blocks: platform?.recommendedPlatforms
      ? [{ ...platform.recommendedPlatforms, __component: 'blocks.recommended-platforms' }]
      : [],
    getPropsConfig,
  });

  return {
    props: {
      contentBlocks: extendedBlocks || [],
      layoutConfig: layoutConfig || {},
      platform: { ...platform, recommendedPlatforms: recommendedPlatforms?.[0] || {} },
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

export type PlatformPageType = {
  contentBlocks?: any[];
  currenciesExchangeRate: CurrencyResponseType[];
  platform: PlatformDTO;
};

const PlatformPage = ({
  contentBlocks,
  platform: { detailedDescription, labels, logo, recommendedPlatforms, title },
  platform,
}: PlatformPageType) => {
  const parsedLabelsToDisplay = strapiData<LabelDTO>(labels) as LabelDTO[];

  return (
    <main className={cn('grid grid-cols-12 gap-2')}>
      <div className="col-span-full pt-5 md:pt-[96px]" data-breadcrumbs-placeholder />
      <div className="col-span-full md:col-span-10 md:p-2 md:shadow-lg">
        <div className="grid grid-cols-[minmax(100px,140px)_1fr] gap-2">
          <div className="relative aspect-[5/2] w-full shrink-0">
            <Image
              alt=""
              className="object-contain"
              src={logo?.data?.attributes?.url || placeholderSrc}
            />
          </div>

          <h1 className="text-h2 self-center">{title}</h1>
          <p className="col-span-2 md:col-span-1 md:col-start-2">{detailedDescription}</p>
        </div>
        <Spacer className="py-2 md:py-3" dividerPosition="center" withDivider />
        <div
          className={cn(
            'grid grid-cols-2 gap-1',
            'flex-wrap justify-center md:flex md:gap-6 md:px-2',
          )}
        >
          {parsedLabelsToDisplay?.map(({ icon, title }) => (
            <Label
              className="flex items-center whitespace-nowrap rounded-full bg-lightGrey px-2 py-1"
              iconSrc={icon.data?.attributes.url}
              key={title}
              label={title}
            />
          ))}
        </div>
        <Spacer className="py-3" dividerPosition="center" withDivider />
        <BlockRenderer blocks={contentBlocks} />
      </div>
      <RecommendedPlatforms
        className="col-span-full pt-10"
        {...(recommendedPlatforms as RecommendedPlatformsBlockType)}
      />
    </main>
  );
};

export default withLayout(PlatformPage);
