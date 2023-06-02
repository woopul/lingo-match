import { Image } from '@lingo-match/components';
import Label from '@lingo-match/components/Atoms/Label';
import {
  LabelDTO,
  PlatformCardConfigDTO,
  PlatformTrimToCardDTO,
} from '@lingo-match/types/strapi/blocks';
import { getPlatformUrl } from '@lingo-match/utlis';
import { parseStrapiResponseToData } from '@lingo-match/utlis/parseStrapiResponse';
import clsx from 'clsx';
import NextLink from 'next/link';

export type PlatformCardProps = PlatformTrimToCardDTO &
  PlatformCardConfigDTO & {
    className?: string;
  };

const placeholderSrc =
  'https://res.cloudinary.com/dbnc7cgvp/image/upload/v1682797183/logo_2_33627850b1.png';

const PlatformCard = ({
  basicVersionLabel,
  basicVersionPayedLabel,
  className,
  labels,
  logo,
  priceAsNumber,
  priceBeforeDiscountAsNumber,
  priceForShortLabel,
  pricePerMonthLabel,
  shortDescription,
  slug,
  title,
}: PlatformCardProps) => {
  const parsedLabelsToDisplay = parseStrapiResponseToData<LabelDTO[]>(labels) as LabelDTO[];
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
              src={logo.data?.attributes?.url || placeholderSrc}
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
          <div className="flex items-end mt-auto">
            {!!priceBeforeDiscountAsNumber && (
              <div className="text-accentOne line-through mr-3">
                US$ {priceBeforeDiscountAsNumber}
              </div>
            )}
            <div>
              <span className="font-bold text-black text-16"> {priceAsNumber} $</span>
              <span className="text-middleGrey">{pricePerMonthLabel}</span>
            </div>
          </div>
          <div className="text-middleGrey mt-1">{priceForShortLabel}</div>
        </div>
        <div className={clsx('col-span-3 flex gap-2 overflow-x-scroll self-end')}>
          {parsedLabelsToDisplay?.map(({ icon, title }) => (
            <Label
              className="whitespace-nowrap bg-lightGrey rounded-full flex items-center px-2 py-1 h-max "
              iconSrc={icon.data.attributes.url}
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
