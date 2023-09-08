import { CurrencyResponseType, getCurrenciesExchangeRate } from '@lingo-match/api/currency';
import { getHomePage, getLayoutConfig, getPlatforms } from '@lingo-match/api/strapi';
import { GradientBox } from '@lingo-match/components';
import Button from '@lingo-match/components/Atoms/Button';
import Hero from '@lingo-match/components/Atoms/Hero';
import { PlatformCard } from '@lingo-match/components/Organisms';
import Pagination from '@lingo-match/components/Organisms/Pagination';
import { PlatformFilters } from '@lingo-match/components/Organisms/PlatformFilters/PlatformFilters';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import { DEFAULT_PLATFORMS_PAGE_LIMIT } from '@lingo-match/constants/requests';
import withLayout from '@lingo-match/containers/withLayout';
import {
  BaseGetStaticPropsType,
  MainStrapiMetaType,
} from '@lingo-match/types/strapi/baseApiResponse';
import { HomePageDTO, PlatformDTO } from '@lingo-match/types/strapi/blocks';
import { parseStrapiResponseToData } from '@lingo-match/utlis';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
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
        pageSize: '' + pageSize,
      },
    }),
  ]);

  const blocks = (homePage as HomePageDTO)?.blocks || [];
  const { data: currenciesExchangeRate } = await getCurrenciesExchangeRate();

  return {
    props: {
      blocks: blocks,
      currenciesExchangeRate: currenciesExchangeRate,
      homePage: homePage || {},
      layoutConfig: layoutConfig || {},
      meta: platforms.data?.meta,
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

const HomePage = ({
  currenciesExchangeRate,
  homePage: { hero, mainFilters, paginationItemsPerPage: pageSize, platformCard },
  meta,
  platforms,
}: HomePageProps) => {
  const [platformList, setPlatformList] = useState<PlatformDTO[]>([]);
  const [pageCount, setPageCount] = useState(meta.pagination.pageCount);
  const [total, setTotal] = useState(meta.pagination.total);

  useEffect(() => {
    setPlatformList(platforms);
  }, [platforms]);

  console.log('[...page]', { platformList });

  return (
    <>
      <GradientBox />
      {hero && <Hero {...hero} />}
      <div className="mt-3 grid h-full auto-rows-max grid-cols-12 gap-x-2">
        <PlatformFilters
          filters={mainFilters || []}
          pageSize={pageSize}
          setPageCount={setPageCount}
          setPlatformList={setPlatformList}
          setTotal={setTotal}
          totalItems={total}
        />

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
      <Pagination
        currentPage={meta.pagination.page}
        itemsPerPage={meta.pagination.pageSize}
        pageCount={pageCount}
        renderPageLink={(page) => `/platforms/${page === 1 ? '' : page}`}
        totalItems={meta.pagination.total}
      />
    </>
  );
};

export default withLayout(HomePage);
