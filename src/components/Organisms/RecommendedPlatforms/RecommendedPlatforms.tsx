import { CurrencyResponseType } from '@lingo-match/api/currency';
import { Image } from '@lingo-match/components/Atoms';
import { formatPrice } from '@lingo-match/helpers/formatPrice';
import { BlockType, PlatformDTOMapToRecommendedCard } from '@lingo-match/types/strapi';

export type RecommendedPlatformsLabelsType = {
  descriptionUnderPriceLabel?: string;
  foreignCurrencyDescriptionLabel?: string;
  priceSlashLabel?: string;
};

export type RecommendedPlatformsBlockType = BlockType & {
  currenciesExchangeRate: CurrencyResponseType[];
  labels: RecommendedPlatformsLabelsType;
  platforms: PlatformDTOMapToRecommendedCard[];
  title: string;
};

const RecommendedPlatforms = ({
  currenciesExchangeRate,
  labels,
  platforms,
  title,
}: RecommendedPlatformsBlockType) => {
  console.log({ labels, platforms });
  return (
    <div>
      <h3 className="text-center">{title}</h3>
      <div className="mt-[32px] flex gap-[20px]">
        {platforms.map((item, i) => {
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
            <div
              className="flex aspect-[7/9] w-[20%] flex-col items-center gap-2 rounded-md px-[8px] py-[16px] shadow-lg"
              key={i}
            >
              <div className="relative h-[40px] w-full">
                <Image alt="image" src={item.logo?.data.attributes.url} />
              </div>
              <h4>{item.title}</h4>
              <ul className="flex w-full flex-col items-center rounded-lg bg-lighterGrey py-1">
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
                  {parseAndFormatPriceToCorrectCurrency(priceAsNumber)} {mainCurrencyForThisMarket}
                  <span className="text-xsmall font-normal text-darkGrey">
                    {' '}
                    {labels.priceSlashLabel}
                  </span>
                </div>
                <p className="text-small">{labels.descriptionUnderPriceLabel}</p>
                <p className="mt-0 h-[12px] text-right text-10">
                  {isForeignCurrency() ? labels.foreignCurrencyDescriptionLabel : ' '}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedPlatforms;
