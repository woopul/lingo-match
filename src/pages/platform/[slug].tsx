import { CurrencyResponseType } from '@lingo-match/api/currency';
import { getLayoutConfig, getPlatformBySlug } from '@lingo-match/api/strapi';
import { Image } from '@lingo-match/components';
import { PrettyJSON } from '@lingo-match/components';
import { getPropsConfig } from '@lingo-match/config/getProps.config';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import { placeholderSrc } from '@lingo-match/constants/urls';
import withLayout from '@lingo-match/containers/withLayout';
import { PlatformDTO } from '@lingo-match/types/strapi';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { extendBlockData } from '@lingo-match/utlis';
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
  platform: { description, logo, recommendedPlatforms, title },
  platform,
}: PlatformPageType) => {
  console.log({ platform });
  return (
    <main className={cn('grid min-h-screen grid-cols-12')}>
      <div className="col-span-full pt-[96px]" data-breadcrumbs-placeholder />
      <div className="col-span-10 md:shadow-lg">
        <div className="flex">
          <div className="relative h-[4rem] w-[9rem] shrink-0 desktop:w-[11.5rem]">
            <Image
              alt=""
              className="object-contain"
              src={logo?.data?.attributes?.url || placeholderSrc}
            />
          </div>
          <div>
            <h1 className="text-h3">title</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {<PrettyJSON data={{ blocks: platform.blocks }} key={platform.slug} />}
      </div>
    </main>
  );
};

export default withLayout(PlatformPage);
