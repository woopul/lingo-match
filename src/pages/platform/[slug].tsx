import { CurrencyResponseType, getCurrenciesExchangeRate } from '@lingo-match/api/currency';
import { getLayoutConfig, getPlatformBySlug } from '@lingo-match/api/strapi';
import { PrettyJSON } from '@lingo-match/components';
import { getPropsConfig } from '@lingo-match/config/getProps.config';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { PlatformDTO } from '@lingo-match/types/strapi';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { extendBlockData } from '@lingo-match/utlis';
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

const PlatformPage = ({ platform }: PlatformPageType) => {
  return (
    <main className="min-h-screen">
      <div className=""></div>
      <div className="flex flex-col">
        {<PrettyJSON data={{ blocks: platform.blocks }} key={platform.slug} />}
      </div>
    </main>
  );
};

export default withLayout(PlatformPage);
