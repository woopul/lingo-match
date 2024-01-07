import LinkButton from '@lingo-match/components/Atoms/LinkButton';
import { useLabels } from '@lingo-match/context/LabelsProvider';
import { LabelsContextType } from '@lingo-match/context/LabelsProvider/Context';
import { formatPrice } from '@lingo-match/helpers/formatPrice';
import { pricingBlockMock } from '@lingo-match/mocks/pricingBlock';
import { PricingBlockDTO, SubscriptionTypeDTO } from '@lingo-match/types/strapi';
import { cn } from '@lingo-match/utlis/cn';
import { useEffect, useState } from 'react';
import { IoPricetagsOutline } from 'react-icons/io5';

import { CTAButton } from './components/CTAButton';

type PricingBlockStrapiLabels = {
  foreignCurrencyDescriptionLabel?: string;
  freeRegistrationAcccent?: string;
  freeRegistrationTitle?: string;
  navigateToCTAButtonLabel?: string;
  priceForShortLabel?: string;
  priceLabel?: string;
  pricePerMonthLabel?: string;
};

export type PriceBlockProps = {
  currenciesExchangeRate: any[];
  currency: string;
  mainCurrencyForThisMarket: string;
} & PricingBlockDTO;

export const PricingBlock = ({
  currenciesExchangeRate,
  currency,
  freeRegistration,
  linkCTA = '',
  mainCurrencyForThisMarket,
  subscriptionType,
}: PriceBlockProps) => {
  const pricingBlockLabels = useLabels('pricingBlock') as PricingBlockStrapiLabels;
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
    setHeaderHeight(headerHeight);
  }, []);

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
    <>
      <div className="relative col-span-full -ml-2 h-full w-screen md:col-span-1 md:-ml-0 md:w-full">
        <div
          className="sticky h-fit overflow-hidden rounded-md shadow-lg"
          style={{ top: headerHeight + 12 }}
        >
          <div className="flex h-[54px] w-full items-center justify-center bg-orange">
            <IoPricetagsOutline />
            <span className="text-paragraph ml-1">{pricingBlockLabels.priceLabel}</span>
          </div>
          <div
            className={cn(
              'min-h-[80px]',
              '[&>*]:border-b-[1px] [&>*]:border-lightGrey [&>*]:last:border-b-0',
            )}
          >
            {subscriptionType?.map((item, i) => {
              return (
                <div className="mx-2 border-b-[1px] py-1.5" key={i}>
                  <h3 className="text-paragraph pb-2 text-center">
                    {item.subscription.data.attributes.title}
                  </h3>
                  <div className="text-small mt-auto flex flex-col gap-0.5 text-right">
                    {isForeignCurrency() && pricingBlockLabels.foreignCurrencyDescriptionLabel && (
                      <div className="text-small mt-auto">
                        {pricingBlockLabels.foreignCurrencyDescriptionLabel}
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
                          {pricingBlockLabels.pricePerMonthLabel}
                        </span>
                      </div>
                    </div>
                    <div className="text-middleGrey">{pricingBlockLabels.priceForShortLabel}</div>
                  </div>
                </div>
              );
            })}
            {freeRegistration && (
              <div className="mx-2 py-1.5 pr-1">
                <h3 className="text-small pb-0.5 text-right text-middleGrey">
                  {pricingBlockLabels.freeRegistrationTitle}
                </h3>
                <h4 className="text-h3 text-right text-accentTwo">
                  {pricingBlockLabels.freeRegistrationAcccent}
                </h4>
              </div>
            )}
          </div>
          <CTAButton
            className="hidden md:flex"
            linkCTA={linkCTA}
            navigateToCTAButtonLabel={pricingBlockLabels.navigateToCTAButtonLabel}
          />
        </div>
      </div>
      <CTAButton
        className="sticky bottom-0 -ml-2 w-screen md:hidden"
        linkCTA={linkCTA}
        navigateToCTAButtonLabel={pricingBlockLabels.navigateToCTAButtonLabel}
      />
    </>
  );
};
