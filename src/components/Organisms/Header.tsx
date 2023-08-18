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
        'sticky top-0 z-10 h-auto w-full bg-gradient-to-b from-primary-600 to-[#9447fe] text-white desktop:h-[8.5rem]',
        className,
      )}
    >
      <div className="mx-auto flex max-w-[144rem] items-center justify-between px-2 py-2 desktop:px-8">
        <NextLink className="flex flex-col no-underline" href="/">
          {logo ? (
            <div className="relative h-[3.5rem] w-[15rem]">
              <Image
                alt={logo.data.attributes.alternativeText || ''}
                src={logo.data.attributes.url}
              />
            </div>
          ) : (
            <h1 className="text-h2 font-bold ">{logoTitle}</h1>
          )}
          {logoDescription && (
            <div className="text-small mt-0.5 hidden desktop:block">{logoDescription}</div>
          )}
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
