import { CurrencyResponseType } from '@lingo-match/api/currency';
import { Image } from '@lingo-match/components';
import Label from '@lingo-match/components/Atoms/Label';
import { formatPrice } from '@lingo-match/helpers/formatPrice';
import { SUPPORTED_CURRENCIES } from '@lingo-match/types/strapi';
import {
  LabelDTO,
  PlatformCardConfigDTO,
  PlatformDTOMapToMainCard,
} from '@lingo-match/types/strapi/blocks';
import { getPlatformUrl } from '@lingo-match/utlis';
import { cn } from '@lingo-match/utlis/cn';
import { parseStrapiResponseToData, strapiData } from '@lingo-match/utlis/parseStrapiResponse';
import NextLink from 'next/link';

export type PlatformCardProps = {
  className?: string;
  currenciesExchangeRate: CurrencyResponseType[];
  platformData: PlatformDTOMapToMainCard;
} & PlatformCardConfigDTO;

const placeholderSrc =
  'https://res.cloudinary.com/dbnc7cgvp/image/upload/v1682797183/logo_2_33627850b1.png';

export const PlatformCardDesktop = ({
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
  const parsedLabelsToDisplay = strapiData<LabelDTO>(labels) as LabelDTO[];
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
      className={cn('cursor-pointer no-underline hover:shadow-md', className)}
      href={getPlatformUrl(slug)}
    >
      <div
        className={cn(
          'grid h-[18rem] min-h-[17.5rem] w-full grid-cols-4 gap-x-2 gap-y-2 rounded-md bg-white px-2 py-2 drop-shadow-md desktop:h-fit desktop:px-3',
        )}
      >
        <div className="col-span-3 flex items-start gap-2">
          <div className="relative h-[4rem] w-[9rem] shrink-0 desktop:w-[11.5rem]">
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
        <div className="text-small col-span-1 row-span-2 flex flex-col items-end text-middleGrey">
          <div>{basicVersionLabel}</div>
          <p className="text-16 font-bold text-accentTwo">{basicVersionPayedLabel}</p>
          <div className="mt-auto flex flex-col gap-1 text-right">
            {isForeignCurrency() && paymentInForeignCurrencyLabel && (
              <div className="mt-auto">{paymentInForeignCurrencyLabel}</div>
            )}
            <div className="flex justify-end">
              {!!priceBeforeDiscountAsNumber && (
                <div className="mr-3 text-accentOne line-through">
                  {mainCurrencyForThisMarket}{' '}
                  {parseAndFormatPriceToCorrectCurrency(priceBeforeDiscountAsNumber)}
                </div>
              )}
              <div>
                <span className="text-16 font-bold text-black">
                  {parseAndFormatPriceToCorrectCurrency(priceAsNumber)} {mainCurrencyForThisMarket}
                </span>
                <span className="text-middleGrey">{pricePerMonthLabel}</span>
              </div>
            </div>
            <div className="text-middleGrey">{priceForShortLabel}</div>
          </div>
        </div>
        <div className={cn('col-span-3 flex gap-2 self-end overflow-hidden')}>
          {parsedLabelsToDisplay?.map(({ icon, title }) => (
            <Label
              className="flex items-center whitespace-nowrap rounded-full bg-lightGrey px-2 py-1"
              iconSrc={icon.data?.attributes.url}
              key={title}
              label={title}
            />
          ))}
        </div>
      </div>
    </NextLink>
  );
};
