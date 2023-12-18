import { CurrencyResponseType } from '@lingo-match/api/currency';
import { getLayoutConfig, getPlatformBySlug } from '@lingo-match/api/strapi';
import { Image, Spacer } from '@lingo-match/components';
import { PrettyJSON } from '@lingo-match/components';
import Label from '@lingo-match/components/Atoms/Label';
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
    getPlatformBySlug(context.params?.slug as string),
  ]);

  const blocks = (platform as PlatformDTO)?.blocks;

  const extendedBlocks = await extendBlockData({
    blocks,
    getPropsConfig,
  });

  return {
    props: {
      blocks: extendedBlocks || [],
      layoutConfig: layoutConfig || {},
      platform: platform || 'Not found',
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

export type PlatformPageType = {
  currenciesExchangeRate: CurrencyResponseType[];
  platform: PlatformDTO;
};

const PlatformPage = ({
  platform: { detailedDescription, labels, logo, recommendedPlatforms, title },
  platform,
}: PlatformPageType) => {
  const parsedLabelsToDisplay = strapiData<LabelDTO>(labels) as LabelDTO[];

  console.log({ platform });
  return (
    <main className={cn('grid min-h-screen grid-cols-12')}>
      <div className="col-span-full pt-[96px]" data-breadcrumbs-placeholder />
      <div className="col-span-10 p-2 md:shadow-lg">
        <div className="grid grid-cols-[minmax(100px,140px)_1fr] gap-2">
          <div className="relative aspect-[5/2] w-full shrink-0">
            <Image
              alt=""
              className="object-contain"
              src={logo?.data?.attributes?.url || placeholderSrc}
            />
          </div>

          <h1 className="text-h2 self-center">Title</h1>
          <p className="col-start-2">{detailedDescription}</p>
        </div>
        <Spacer className="py-3" dividerPosition="center" withDivider />
        <div className="flex justify-center gap-6 px-2">
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
      </div>
      <div className="flex flex-col">
        {<PrettyJSON data={{ blocks: platform.blocks }} key={platform.slug} />}
      </div>
    </main>
  );
};

export default withLayout(PlatformPage);
