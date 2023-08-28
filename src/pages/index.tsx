import { CurrencyResponseType, getCurrenciesExchangeRate } from '@lingo-match/api/currency';
import { getHomePage, getLayoutConfig, getPlatforms } from '@lingo-match/api/strapi';
import { GradientBox } from '@lingo-match/components';
import Hero from '@lingo-match/components/Atoms/Hero';
import { PlatformCard } from '@lingo-match/components/Organisms';
import { PlatformFilters } from '@lingo-match/components/Organisms/PlatformFilters/PlatformFilters';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { HomePageDTO, PlatformDTO } from '@lingo-match/types/strapi/blocks';
import { GetStaticProps } from 'next';
import { useState } from 'react';

export const getStaticProps: GetStaticProps<BaseGetStaticPropsType> = async (context) => {
  console.log('context', context);

  const [layoutConfig, platforms, homePage] = await Promise.all([
    getLayoutConfig(),
    getPlatforms(),
    getHomePage(),
  ]);

  const blocks = (homePage as HomePageDTO)?.blocks || [];
  const { data: currenciesExchangeRate } = await getCurrenciesExchangeRate();

  return {
    props: {
      blocks: blocks,
      currenciesExchangeRate: currenciesExchangeRate,
      homePage: homePage || {},
      layoutConfig: layoutConfig || {},
      platforms: platforms || [],
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

type HomePageProps = {
  currenciesExchangeRate: CurrencyResponseType[];
  homePage: HomePageDTO;
  platforms: PlatformDTO[];
};

const HomePage = ({
  currenciesExchangeRate,
  homePage: { hero, mainFilters, platformCard },
  platforms,
}: HomePageProps) => {
  const [platformList, setPlatformList] = useState<PlatformDTO[]>(platforms);

  return (
    <>
      <GradientBox />
      {hero && <Hero {...hero} />}
      <div className="mt-3 grid h-full min-h-[150vh] auto-rows-max grid-cols-12 gap-x-2">
        <PlatformFilters filters={mainFilters || []} setPlatformList={setPlatformList} />

        {!!platformList?.length && (
          <div className="col-span-12 flex  flex-col  gap-y-2 desktop:col-span-9">
            {platformList.map((platform) => (
              <PlatformCard
                currenciesExchangeRate={currenciesExchangeRate}
                {...platformCard}
                key={platform.slug}
                platformData={platform}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default withLayout(HomePage);
