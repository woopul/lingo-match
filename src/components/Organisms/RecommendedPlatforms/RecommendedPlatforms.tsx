import { CurrencyResponseType } from '@lingo-match/api/currency';
import { Image, Link } from '@lingo-match/components/Atoms';
import { MD } from '@lingo-match/constants/mediaQueries';
import { formatPrice } from '@lingo-match/helpers/formatPrice';
import { useMediaQuery } from '@lingo-match/hooks/useMediaQuery';
import { BlockType, PlatformDTOMapToRecommendedCard } from '@lingo-match/types/strapi';
import { getPlatformUrl } from '@lingo-match/utlis';
import { cn } from '@lingo-match/utlis/cn';
import { Swiper, SwiperSlide } from 'swiper/react';

export type RecommendedPlatformsLabelsType = {
  descriptionUnderPriceLabel?: string;
  foreignCurrencyDescriptionLabel?: string;
  priceSlashLabel?: string;
};

export type RecommendedPlatformsBlockType = BlockType & {
  className?: string;
  currenciesExchangeRate: CurrencyResponseType[];
  labels: RecommendedPlatformsLabelsType;
  platforms: PlatformDTOMapToRecommendedCard[];
  title: string;
};

const RecommendedPlatforms = ({
  className,
  currenciesExchangeRate,
  labels,
  platforms,
  title,
}: RecommendedPlatformsBlockType) => {
  const isDesktop = useMediaQuery(MD);

  const swiperConfig = {
    slidesPerView: isDesktop ? 4.5 : 2.1,
    spaceBetween: isDesktop ? 16 : 8,
  };

  return (
    <div className={className}>
      <h3 className="text-center">{title}</h3>
      <div className={cn('mt-[32px] md:flex', '[&>.swiper]:-mx-[15px] [&>.swiper]:px-[10px]')}>
        <Swiper {...swiperConfig}>
          {platforms?.map((item, i) => {
            const { currency, mainCurrencyForThisMarket, priceAsNumber } = item;
            const isForeignCurrency = () => currency !== mainCurrencyForThisMarket;

            // TODO - change it to use mixed currencies pair exchange rate
            const getCalculatedValueInPLN = (price: number) => {
              const currencyRate =
                currenciesExchangeRate?.find((item) => item.code === currency)?.mid ?? 1;
              return price * currencyRate;
            };

            const parseAndFormatPriceToCorrectCurrency = (price: number) => {
              let priceValue = price;
              if (isForeignCurrency()) {
                priceValue = getCalculatedValueInPLN(price);
              }
              return formatPrice(priceValue);
            };

            return (
              <SwiperSlide key={item.slug}>
                <Link
                  className="my-[5%] flex aspect-[7/9] w-full flex-col items-center gap-2 rounded-md px-[8px] py-[16px] shadow-lg"
                  href={getPlatformUrl(item.slug)}
                >
                  <div className="relative h-[40px] w-full">
                    <Image alt="image" src={item.logo?.data?.attributes.url} />
                  </div>
                  <h4>{item.title}</h4>
                  <ul className="flex min-h-[60px] w-full flex-col items-center justify-center rounded-lg bg-lighterGrey py-1 md:min-h-[80px]">
                    {item.labels.data?.slice(0, 3).map((label, i) => (
                      <li
                        className="text-small before: font-semibold text-darkGrey before:mx-auto before:my-[3px] before:block before:h-[3px] before:w-[3px] before:rounded-full before:bg-darkGrey first:before:hidden"
                        key={i}
                      >
                        {label.attributes.title}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto self-end text-darkGrey">
                    <div className="text-preamble whitespace-nowrap text-right font-semibold text-black">
                      {parseAndFormatPriceToCorrectCurrency(priceAsNumber)}
                      {mainCurrencyForThisMarket}
                      <span className="text-xsmall font-normal text-darkGrey">
                        {labels.priceSlashLabel}
                      </span>
                    </div>
                    <p className="text-small">{labels.descriptionUnderPriceLabel}</p>
                    <p className="mt-0 h-[12px] text-right text-10">
                      {isForeignCurrency() ? labels.foreignCurrencyDescriptionLabel : ' '}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default RecommendedPlatforms;
