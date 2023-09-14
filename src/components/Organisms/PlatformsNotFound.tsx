import { Image } from '@lingo-match/components';
import { PlatformNotFoundDTO } from '@lingo-match/types/strapi';
import { cn } from '@lingo-match/utlis/cn';

import RichText from '../Atoms/RichText';

export type PlatformsNotFoundProps = PlatformNotFoundDTO & {
  className?: string;
};

export const PlatformsNotFound = ({
  className,
  description,
  imageSrc,
  subtitle,
  title,
}: PlatformsNotFoundProps) => {
  return (
    <div
      className={cn(
        'z-10 flex flex-col justify-between gap-2 rounded-lg bg-white px-2 py-2 shadow-lg sm:flex-row sm:gap-[40px] sm:p-4 sm:pr-5',
        className,
      )}
    >
      <div className="flex flex-col">
        <h3 className="text-20">{title}</h3>
        <h4 className="mt-3 text-16">{subtitle}</h4>
        <RichText
          className="text-16 [&>*+*]:mt-[4px] [&_a]:text-[#4200FF] [&_a]:no-underline"
          data={description}
        />
      </div>
      <div className="relative h-[187px] w-full max-w-[278px] shrink-0 self-center">
        <Image
          alt={imageSrc?.data?.attributes.alternativeText ?? ''}
          className="object-cover"
          src={imageSrc?.data?.attributes.url || ''}
        />
      </div>
    </div>
  );
};
