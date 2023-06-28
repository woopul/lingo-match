import { CurrencyResponseType, getCurrenciesExchangeRate } from '@lingo-match/api/currency';
import { getHomePage, getLayoutConfig, getPlatforms } from '@lingo-match/api/strapi';
import { GradientBox } from '@lingo-match/components';
import Hero from '@lingo-match/components/Atoms/Hero';
import { PlatformCard } from '@lingo-match/components/Organisms';
import MainPlatformFilters from '@lingo-match/components/Organisms/MainPlatformFilters';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { HomePageDTO, PlatformDTO } from '@lingo-match/types/strapi/blocks';
import { GetStaticProps } from 'next';
import { useState } from 'react';

export const getStaticProps: GetStaticProps<BaseGetStaticPropsType> = async (context) => {
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
      <div className="grid grid-cols-12 gap-x-2 h-full min-h-[150vh] mt-3">
        <aside className="bg-white col-span-3 rounded-md sticky top-[calc(8.5rem+1.6rem)] min-h-[40rem] h-fit drop-shadow-md">
          <MainPlatformFilters filters={mainFilters || []} setPlatformList={setPlatformList} />
        </aside>
        {!!platformList?.length && (
          <div className="flex flex-col gap-y-2 col-span-9">
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
