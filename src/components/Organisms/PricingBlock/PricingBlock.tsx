import LinkButton from '@lingo-match/components/Atoms/LinkButton';
import { useLabels } from '@lingo-match/context/LabelsProvider';
import { LabelsContextType } from '@lingo-match/context/LabelsProvider/Context';
import { formatPrice } from '@lingo-match/helpers/formatPrice';
import { pricingBlockMock } from '@lingo-match/mocks/pricingBlock';
import { SubscriptionTypeDTO } from '@lingo-match/types/strapi';
import { IoPricetagsOutline } from 'react-icons/io5';

type PricingBlockStrapiLabels = {
  navigateToCTAButtonLabel?: string;
  priceForShortLabel?: string;
  priceLabel?: string;
  pricePerMonthLabel?: string;
};

export type PriceBlockProps = {
  currenciesExchangeRate: any[];
  currency: string;
  link?: string;
  mainCurrencyForThisMarket: string;
  navigateToCTAButtonLabel: string;
  priceLabel: string;
  subscriptionType: SubscriptionTypeDTO[];
};

export const PricingBlock = ({
  currenciesExchangeRate,
  currency,
  link,
  mainCurrencyForThisMarket,
  navigateToCTAButtonLabel,
  priceLabel,
  subscriptionType,
}: PriceBlockProps) => {
  const { pricingBlock = {} }: any = useLabels();
  const isForeignCurrency = () => currency !== mainCurrencyForThisMarket;

  // TODO - change it to use mixed currencies pair exchange rate
  const getCalculatedValueInPLN = (price: number) => {
    const currencyRate = currenciesExchangeRate?.find((item) => item.code === currency)?.mid ?? 1;
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
    <div className="relative col-span-full h-full w-full md:col-span-1">
      <div className="sticky top-[95px] h-fit overflow-hidden rounded-md shadow-lg">
        <div className="flex h-[54px] w-full items-center justify-center bg-orange">
          <IoPricetagsOutline />
          <span className="text-paragraph ml-1">{priceLabel}</span>
        </div>
        <div className="min-h-[80px]">
          {subscriptionType.map((item, i) => {
            return (
              <div
                className="mx-2 border-b-[1px] border-lightGrey pb-1 pt-2 last:border-b-0"
                key={i}
              >
                <h3 className="text-paragraph pb-2.5 text-center">
                  {item.subscription.data.attributes.title}
                </h3>
                <div className="text-small mt-auto flex flex-col gap-1 text-right">
                  {isForeignCurrency() && pricingBlock.foreignCurrencyDescriptionLabel && (
                    <div className="text-small mt-auto">
                      {pricingBlock.foreignCurrencyDescriptionLabel}
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
                      <span className="text-middleGrey">{pricingBlock.pricePerMonthLabel}</span>
                    </div>
                  </div>
                  <div className="text-middleGrey">{pricingBlock.priceForShortLabel}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex h-[90px] w-full items-center justify-center bg-orange">
          <LinkButton className="h-[40px] w-[70%]" href={link}>
            {navigateToCTAButtonLabel}
          </LinkButton>
        </div>
      </div>
    </div>
  );
};
