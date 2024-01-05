import { CurrencyResponseType, getCurrenciesExchangeRate } from '@lingo-match/api/currency';
import { getLayoutConfig, getPlatformBySlug } from '@lingo-match/api/strapi';
import { Image, RecommendedPlatforms, Spacer } from '@lingo-match/components';
import { PrettyJSON } from '@lingo-match/components';
import Button from '@lingo-match/components/Atoms/Button';
import Label from '@lingo-match/components/Atoms/Label';
import LinkButton from '@lingo-match/components/Atoms/LinkButton';
import BlockRenderer from '@lingo-match/components/BlockRenderer';
import { PriceBlock } from '@lingo-match/components/Organisms/PriceBlock/PriceBlock';
import { RecommendedPlatformsBlockType } from '@lingo-match/components/Organisms/RecommendedPlatforms/RecommendedPlatforms';
import { getPropsConfig } from '@lingo-match/config/getProps.config';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import { placeholderSrc } from '@lingo-match/constants/urls';
import withLayout from '@lingo-match/containers/withLayout';
import { formatPrice } from '@lingo-match/helpers/formatPrice';
import { pricingBlockMock } from '@lingo-match/mocks/pricingBlock';
import { LabelDTO, PlatformDTO, SUPPORTED_CURRENCIES } from '@lingo-match/types/strapi';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { extendBlockData, strapiData } from '@lingo-match/utlis';
import { cn } from '@lingo-match/utlis/cn';
import { GetStaticProps } from 'next';
import { IoPricetagsOutline } from 'react-icons/io5';

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

  // extend recommended platform block
  const recommendedPlatforms = await extendBlockData({
    blocks: platform?.recommendedPlatforms
      ? [{ ...platform.recommendedPlatforms, __component: 'blocks.recommended-platforms' }]
      : [],
    getPropsConfig,
  });

  const { data: currenciesExchangeRate } = await getCurrenciesExchangeRate();

  return {
    props: {
      contentBlocks: extendedBlocks || [],
      currenciesExchangeRate,
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
  currenciesExchangeRate,
  platform: {
    currency = SUPPORTED_CURRENCIES.PLN,
    detailedDescription,
    labels,
    logo,
    mainCurrencyForThisMarket,
    recommendedPlatforms,
    title,
  },
  platform,
}: PlatformPageType) => {
  const parsedLabelsToDisplay = strapiData<LabelDTO>(labels) as LabelDTO[];
  // const isForeignCurrency = () => currency !== mainCurrencyForThisMarket;

  // // TODO - change it to use mixed currencies pair exchange rate
  // const getCalculatedValueInPLN = (price: number) => {
  //   const currencyRate = currenciesExchangeRate?.find((item) => item.code === currency)?.mid ?? 1;
  //   return price * currencyRate;
  // };

  // const parseAndFormatPriceToCorrectCurrency = (price: number) => {
  //   let priceValue = price;
  //   if (isForeignCurrency()) {
  //     priceValue = getCalculatedValueInPLN(price);
  //   }
  //   return formatPrice(priceValue);
  // };

  return (
    <main className={cn('grid-cols-[10fr_minmax(250px,_2fr)] gap-2 md:grid')}>
      <div className="col-span-full pt-5 md:pt-[96px]" data-breadcrumbs-placeholder />
      <div className="col-span-full md:col-span-1 md:p-2 md:shadow-lg">
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
      {/* <div className="relative col-span-full h-full w-full md:col-span-1">
        <div className="sticky top-[95px] h-fit overflow-hidden rounded-md shadow-lg">
          <div className="flex h-[54px] w-full items-center justify-center bg-orange">
            <IoPricetagsOutline />
            <span className="text-paragraph ml-1">Cena</span>
          </div>
          <div className="min-h-[80px]">
            {pricingBlockMock.subscriptionType.map((item, i) => {
              return (
                <div
                  className="mx-2 border-b-[1px] border-lightGrey pb-1 pt-2 last:border-b-0"
                  key={i}
                >
                  <h3 className="text-paragraph pb-2.5 text-center">
                    {item.subscription.data.attributes.title}
                  </h3>
                  <div className="text-small mt-auto flex flex-col gap-1 text-right">
                    {isForeignCurrency() && translationsLabels.paymentInForeignCurrencyLabel && (
                      <div className="text-small mt-auto">
                        {translationsLabels.paymentInForeignCurrencyLabel}
                      </div>
                    )}
                    <div className="text-small flex justify-end">
                      {!!item.priceBeforeDiscountAsNumber && (
                        <div className="mr-1 text-accentOne line-through">
                          {mainCurrencyForThisMarket}{' '}
                          {parseAndFormatPriceToCorrectCurrency(item.priceBeforeDiscountAsNumber)}
                        </div>
                      )}
                      <div>
                        <span className="text-16 font-bold text-black">
                          {parseAndFormatPriceToCorrectCurrency(item.priceAsNumber)}{' '}
                          {mainCurrencyForThisMarket}
                        </span>
                        <span className="text-middleGrey">
                          {translationsLabels.pricePerMonthLabel}
                        </span>
                      </div>
                    </div>
                    <div className="text-middleGrey">{translationsLabels.priceForShortLabel}</div>
                  </div>
                </div>
              );
            })}
          </div> */}
      {/* <div className="flex h-[90px] w-full items-center justify-center bg-orange">
            <LinkButton className="h-[40px] w-[70%]" href={pricingBlockMock.linkCTA}>
              Zobacz
            </LinkButton>
          </div>
        </div>
      </div> */}
      <PriceBlock
        currenciesExchangeRate={[]}
        currency={currency}
        mainCurrencyForThisMarket={mainCurrencyForThisMarket}
        navigateToCTAButtonLabel="Zobacz"
        priceLabel="cena"
        subscriptionType={[]}
      />
      <RecommendedPlatforms
        className="col-span-full pt-10"
        {...(recommendedPlatforms as RecommendedPlatformsBlockType)}
      />
    </main>
  );
};

export default withLayout(PlatformPage);
