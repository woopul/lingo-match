import { CurrencyResponseType } from '@lingo-match/api/currency';
import { Image } from '@lingo-match/components';
import Label from '@lingo-match/components/Atoms/Label';
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

export type PlatformCardProps = {
  className?: string;
  currenciesExchangeRate: CurrencyResponseType[];
  platformData: PlatformTrimToCardDTO;
} & PlatformCardConfigDTO;

const placeholderSrc =
  'https://res.cloudinary.com/dbnc7cgvp/image/upload/v1682797183/logo_2_33627850b1.png';

const PlatformCard = ({
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
    shortDescription,
    slug,
    title,
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
    <NextLink className="cursor-pointer no-underline hover:shadow-md" href={getPlatformUrl(slug)}>
      <div
        className={clsx(
          'w-full px-3 bg-white gap-y-2 gap-x-2 py-2 grid grid-cols-4 rounded-md drop-shadow-md min-h-[17.5rem]',
          className,
        )}
      >
        <div className="col-span-3 flex gap-2 items-start">
          <div className="w-[11.5rem] h-[4rem] relative">
            <Image
              alt=""
              className="object-contain"
              src={logo?.data?.attributes?.url || placeholderSrc}
            />
          </div>
          <div className="w-full">
            <h3>{title}</h3>
            <p>{shortDescription}</p>
          </div>
        </div>
        <div className="col-span-1 text-small flex text-middleGrey flex-col row-span-2 items-end">
          <div>{basicVersionLabel}</div>
          <p className="text-16 font-bold text-accentTwo">{basicVersionPayedLabel}</p>
          <div className="mt-auto text-right flex flex-col gap-1">
            {isForeignCurrency() && paymentInForeignCurrencyLabel && (
              <div className="mt-auto">{paymentInForeignCurrencyLabel}</div>
            )}
            <div className="flex justify-end">
              {!!priceBeforeDiscountAsNumber && (
                <div className="text-accentOne line-through mr-3">
                  {mainCurrencyForThisMarket}{' '}
                  {parseAndFormatPriceToCorrectCurrency(priceBeforeDiscountAsNumber)}
                </div>
              )}
              <div>
                <span className="font-bold text-black text-16">
                  {parseAndFormatPriceToCorrectCurrency(priceAsNumber)} {mainCurrencyForThisMarket}
                </span>
                <span className="text-middleGrey">{pricePerMonthLabel}</span>
              </div>
            </div>
            <div className="text-middleGrey">{priceForShortLabel}</div>
          </div>
        </div>
        <div className={clsx('col-span-3 flex gap-2 self-end')}>
          {parsedLabelsToDisplay?.map(({ icon, title }) => (
            <Label
              className="whitespace-nowrap bg-lightGrey rounded-full flex items-center px-2 py-1 h-max "
              iconSrc={icon?.data.attributes.url}
              key={title}
              label={title}
            />
          ))}
        </div>
      </div>
    </NextLink>
  );
};

export default PlatformCard;
