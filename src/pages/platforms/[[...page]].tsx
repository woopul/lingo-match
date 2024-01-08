import { CurrencyResponseType, getCurrenciesExchangeRate } from '@lingo-match/api/currency';
import { getHomePage, getLayoutConfig, getPlatforms } from '@lingo-match/api/strapi';
import { GradientBox } from '@lingo-match/components';
import Hero from '@lingo-match/components/Atoms/Hero';
import { PlatformCard } from '@lingo-match/components/Organisms';
import Pagination from '@lingo-match/components/Organisms/Pagination';
import { PlatformFilters } from '@lingo-match/components/Organisms/PlatformFilters/PlatformFilters';
import { PlatformsNotFound } from '@lingo-match/components/Organisms/PlatformsNotFound';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import { DEFAULT_PLATFORMS_PAGE_LIMIT } from '@lingo-match/constants/requests';
import withLayout from '@lingo-match/containers/withLayout';
import { getPlatformPaginationRoute } from '@lingo-match/helpers/getPlatformPaginationRoute';
import {
  BaseGetStaticPropsType,
  MainStrapiMetaType,
} from '@lingo-match/types/strapi/baseApiResponse';
import { HomePageDTO, PlatformDTO } from '@lingo-match/types/strapi/blocks';
import { parseStrapiResponseToData } from '@lingo-match/utlis';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

export const getStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<BaseGetStaticPropsType> = async ({ params }) => {
  if (params?.page && isNaN(Number(params.page[0]))) {
    return {
      notFound: true,
    };
  }

  const currentPage = params?.page?.[0] || 1;
  const homePage = await getHomePage();
  const pageSize = homePage?.paginationItemsPerPage || DEFAULT_PLATFORMS_PAGE_LIMIT;

  const [layoutConfig, platforms] = await Promise.all([
    getLayoutConfig(),
    getPlatforms({
      pagination: {
        page: Number(currentPage),
        pageSize,
      },
    }),
  ]);

  const blocks = (homePage as HomePageDTO)?.blocks || [];
  const { data: currenciesExchangeRate } = await getCurrenciesExchangeRate();

  return {
    props: {
      blocks: blocks,
      currenciesExchangeRate,
      homePage: homePage || {},
      layoutConfig: layoutConfig || {},
      meta: platforms.data?.meta || {},
      platforms: parseStrapiResponseToData<PlatformDTO[]>(platforms.data) || [],
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

type HomePageProps = {
  currenciesExchangeRate: CurrencyResponseType[];
  homePage: HomePageDTO;
  meta: MainStrapiMetaType;
  platforms: PlatformDTO[];
};

const labels = {
  allPlatformsFound: 'Znalezione oferty',
};

const HomePage = ({
  currenciesExchangeRate,
  homePage: { hero, mainFilters, paginationItemsPerPage: pageSize, platformCard, platformNotFound },
  meta,
  platforms,
}: HomePageProps) => {
  const [platformList, setPlatformList] = useState<PlatformDTO[]>([]);
  const [pageCount, setPageCount] = useState(meta.pagination?.pageCount);
  const [total, setTotal] = useState(meta.pagination?.total);

  useEffect(() => {
    setPlatformList(platforms);
  }, [platforms]);

  return (
    <>
      <GradientBox />
      <div className="relative z-20">
        {hero && <Hero {...hero} />}
        <div className="mt-3 flex h-full auto-rows-max grid-cols-12 flex-col gap-x-2 desktop:grid">
          <PlatformFilters
            filters={mainFilters || []}
            pageSize={pageSize}
            setPageCount={setPageCount}
            setPlatformList={setPlatformList}
            setTotal={setTotal}
            totalItems={total}
          />
          <div className="flex flex-col gap-y-2 desktop:col-span-9">
            {platformList.length ? (
              <>
                <div className="hidden text-12 text-darkGrey lg:block">
                  {labels.allPlatformsFound}: {total}
                </div>
                {platformList.map((platform) => (
                  <PlatformCard
                    currenciesExchangeRate={currenciesExchangeRate}
                    {...platformCard}
                    key={platform.slug}
                    platformData={platform}
                  />
                ))}
              </>
            ) : (
              <PlatformsNotFound {...platformNotFound} />
            )}
          </div>
        </div>
        <Pagination
          currentPage={meta.pagination?.page}
          itemsPerPage={meta.pagination?.pageSize}
          pageCount={pageCount}
          renderPageLink={getPlatformPaginationRoute}
          totalItems={meta.pagination?.total}
        />
      </div>
    </>
  );
};

export default withLayout(HomePage);
