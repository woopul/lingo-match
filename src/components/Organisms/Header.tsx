import { Image, Link } from '@lingo-match/components';
import { LinkDTO } from '@lingo-match/components/Atoms/Link';
import { BaseResponseDataWrapper } from '@lingo-match/types/strapi/baseApiResponse';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';
import clsx from 'clsx';
import NextLink from 'next/link';

export type HeaderDTO = {
  links?: LinkDTO[];
  logo?: BaseResponseDataWrapper<StrapiMediaType> | null;
  logoDescription?: string;
  logoTitle?: string;
};

export type HeaderProps = HeaderDTO & {
  className?: string;
};

const Header = ({ className, links, logo, logoDescription, logoTitle }: HeaderProps) => {
  return (
    <header
      className={clsx(
        'w-full h-[8.5rem] sticky z-10 top-0 text-white bg-gradient-to-b from-primary-600 to-[#9447fe]',
        className,
      )}
    >
      <div className="py-2 px-8 flex justify-between items-center max-w-[144rem] mx-auto">
        <NextLink className="no-underline flex flex-col" href="/">
          {logo ? (
            <div className="w-[15rem] relative h-[3.5rem]">
              <Image
                alt={logo.data.attributes.alternativeText || ''}
                src={logo.data.attributes.url}
              />
            </div>
          ) : (
            <h1 className="text-h2 font-bold ">{logoTitle}</h1>
          )}
          {logoDescription && <div className="text-small mt-0.5">{logoDescription}</div>}
        </NextLink>
        <nav className="flex gap-2">
          {links?.map(({ label, path, textColor }) => (
            <Link
              href={path || '/'}
              key={path}
              label={label || ''}
              style={{ color: textColor || '' }}
              variant="styled"
            />
          ))}
          <NextLink className="styled-link" href="/design-system">
            <div className="text-preamble">design system</div>
          </NextLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
