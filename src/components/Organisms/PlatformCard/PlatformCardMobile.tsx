import { CurrencyResponseType } from '@lingo-match/api/currency';
import { Image } from '@lingo-match/components';
import { formatPrice } from '@lingo-match/helpers/formatPrice';
import { SUPPORTED_CURRENCIES } from '@lingo-match/types/strapi';
import {
  LabelDTO,
  PlatformCardConfigDTO,
  PlatformTrimToCardDTO,
} from '@lingo-match/types/strapi/blocks';
import { getPlatformUrl } from '@lingo-match/utlis';
import { parseStrapiResponseToData } from '@lingo-match/utlis/parseStrapiResponse';
import clsx from 'clsx';
import NextLink from 'next/link';
import { TbInfoCircle } from 'react-icons/tb';

export type PlatformCardProps = {
  className?: string;
  currenciesExchangeRate: CurrencyResponseType[];
  platformData: PlatformTrimToCardDTO;
} & PlatformCardConfigDTO;

const placeholderSrc =
  'https://res.cloudinary.com/dbnc7cgvp/image/upload/v1682797183/logo_2_33627850b1.png';

export const PlatformCardMobile = ({
  basicVersionLabel,
  basicVersionPayedLabel,
  className,
  currenciesExchangeRate,
  paymentInForeignCurrencyLabel,
  platformData: {
    currency,
    labels,
    logo,
    mainCurrencyForThisMarket = SUPPORTED_CURRENCIES.PLN,
    priceAsNumber,
    priceBeforeDiscountAsNumber,
    shortDescriptionMobile,
    slug,
  },
  priceForShortLabel,
  pricePerMonthLabel,
}: PlatformCardProps) => {
  const parsedLabelsToDisplay = parseStrapiResponseToData<LabelDTO[]>(labels) as LabelDTO[];
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
    <NextLink
      className="cursor-pointer no-underline hover:shadow-md desktop:hidden"
      href={getPlatformUrl(slug)}
    >
      <div
        className={clsx(
          'flex h-[18rem] flex-col gap-1 rounded-md bg-white p-1.5 drop-shadow-lg',
          className,
        )}
      >
        <div className="flex justify-between">
          <div className="relative mr-3 h-[4rem] w-[9rem] overflow-hidden rounded-md">
            <Image
              alt=""
              className="object-cover"
              src={logo?.data?.attributes?.url || placeholderSrc}
            />
          </div>
          <div className="mt-auto flex flex-col text-right">
            <div className="ml-auto mt-0.5 flex">
              {!!priceBeforeDiscountAsNumber && (
                <div className="mr-1 text-accentOne line-through">
                  {mainCurrencyForThisMarket}{' '}
                  {parseAndFormatPriceToCorrectCurrency(priceBeforeDiscountAsNumber)}
                </div>
              )}
              <div>
                <span className="text-14 font-bold text-black">
                  {parseAndFormatPriceToCorrectCurrency(priceAsNumber)} {mainCurrencyForThisMarket}
                </span>
                <span className="text-darkGrey">{pricePerMonthLabel}</span>
              </div>
            </div>
            <div className="text-xsmall text-darkGrey">{priceForShortLabel}</div>
          </div>
        </div>
        <h3 className="text-h4 mt-1.5 min-h-[30px]">{shortDescriptionMobile}</h3>
        <div className="flex items-center gap-0.5 text-12">
          <TbInfoCircle className="h-2 w-2 text-accentTwo" />
          <div>{basicVersionLabel}</div>
          <p className="ml-0.5 text-12 font-bold text-accentTwo">{basicVersionPayedLabel}</p>
        </div>
        {!!parsedLabelsToDisplay && (
          <div className={clsx('flex items-center overflow-hidden')}>
            {parsedLabelsToDisplay.slice(0, 3).map(({ title }) => (
              <div
                className="text-small flex items-center font-bold text-darkGrey after:mx-[6px] after:inline-block after:h-[4px] after:w-[4px] after:shrink-0 after:rounded-full after:bg-current after:last:hidden"
                key={title}
              >
                {title}
              </div>
            ))}
          </div>
        )}
        {isForeignCurrency() && paymentInForeignCurrencyLabel && (
          <div className="text-xsmall text-right text-darkGrey">
            {paymentInForeignCurrencyLabel}
          </div>
        )}
      </div>
    </NextLink>
  );
};
