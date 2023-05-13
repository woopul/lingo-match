import { Image } from '@lingo-match/components';
import Label from '@lingo-match/components/Atoms/Label';
import LinkButton from '@lingo-match/components/Atoms/LinkButton';
import { LabelDTO, PlatformCardDTO, PlatformDTO } from '@lingo-match/types/strapi/blocks';
import { getPlatformUrl } from '@lingo-match/utlis';
import { parseStrapiResponseToData } from '@lingo-match/utlis/parseStrapiResponse';
import clsx from 'clsx';

export type PlatformCardProps = PlatformDTO &
  PlatformCardDTO & {
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
  navigateToPlatformButtonLabel,
  price,
  priceBeforeDiscount,
  priceForShortLabel,
  pricePerMonthLabel,
  shortDescription,
  slug,
  title,
}: PlatformCardProps) => {
  const parsedLabelsToDisplay = parseStrapiResponseToData<LabelDTO[]>(labels) as LabelDTO[];
  return (
    <div
      className={clsx(
        'w-full px-3 bg-white gap-y-2 gap-x-2 py-2 grid grid-cols-4 rounded-md drop-shadow-md',
        className,
      )}
    >
      <div className="col-span-3 flex gap-2 items-start">
        <div className="w-[11.5rem] h-[4rem] relative">
          <Image className="object-contain" src={logo.data?.attributes?.url || placeholderSrc} />
        </div>
        <div className="w-full">
          <h3>{title}</h3>
          <p>{shortDescription}</p>
        </div>
      </div>
      <div className="col-span-1 text-small flex text-lightGray flex-col items-end">
        <div>{basicVersionLabel}</div>
        <p className="text-16 font-bold text-accentTwo">{basicVersionPayedLabel}</p>
        <div className="flex items-end">
          <div className="text-accentOne line-through mr-3">US$ {priceBeforeDiscount}</div>
          <div>
            <span className="font-bold text-black text-16"> {price} $</span>
            <span className="text-lightGray">{pricePerMonthLabel}</span>
          </div>
        </div>
        <div className="text-lightGray mt-1">{priceForShortLabel}</div>
      </div>
      <div className={clsx('col-span-3 bg-lighterGray rounded-full px-3 flex items-center gap-5')}>
        {parsedLabelsToDisplay?.map(({ icon, title }) => (
          <Label iconSrc={icon.data.attributes.url} key={title} label={title} />
        ))}
      </div>
      <LinkButton href={getPlatformUrl(slug)}>{navigateToPlatformButtonLabel}</LinkButton>
    </div>
  );
};

export default PlatformCard;
