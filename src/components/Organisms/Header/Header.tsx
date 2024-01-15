import { Image, Link } from '@lingo-match/components';
import { LinkDTO } from '@lingo-match/components/Atoms/Link';
import { HOME_PAGE_ROUTE } from '@lingo-match/constants/routes';
import { getHomeRoute } from '@lingo-match/helpers/getHomeRoute';
import { BaseResponseDataWrapper } from '@lingo-match/types/strapi/baseApiResponse';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';
import { cn } from '@lingo-match/utlis/cn';
import NextLink from 'next/link';
import { useState } from 'react';

import { MenuButtonMobile } from './components/MenuButtonMobile';
import { MenuMobile } from './components/MenuMobille';

export type HeaderDTO = {
  links?: LinkDTO[];
  logo?: BaseResponseDataWrapper<StrapiMediaType> | null;
  logoDescription?: string;
  logoTitle?: string;
};

export type HeaderProps = HeaderDTO & {
  className?: string;
};

const headerHeight = {
  desktop: '8.5rem',
  mobile: '6.7rem',
};

export const Header = ({ className, links, logo, logoDescription, logoTitle }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuButtonClick = () => {
    setIsMenuOpen(() => !isMenuOpen);
  };
  return (
    <>
      <MenuMobile className="" close={handleMenuButtonClick} isOpen={isMenuOpen} links={links} />
      <header
        className={cn(
          `sticky top-0 z-30 w-full bg-gradient-to-b from-primary-600 to-[#9447fe] text-white `,
          `h-[${headerHeight.mobile}] desktop:h-[${headerHeight.desktop}]`,
          className,
        )}
        id="header"
      >
        {/* Header mobile */}
        <div className="relative z-[22] flex w-full items-center justify-between overflow-hidden px-2 py-2 sm:hidden">
          <NextLink className="flex flex-col no-underline" href={HOME_PAGE_ROUTE}>
            {logo ? (
              <div className="relative h-[3.5rem] w-[15rem]">
                <Image
                  alt={logo.data?.attributes.alternativeText || ''}
                  src={logo.data?.attributes.url || ''}
                />
              </div>
            ) : (
              <h1 className="text-h2 font-bold ">{logoTitle}</h1>
            )}
          </NextLink>
          <MenuButtonMobile onChange={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
        {/* Header desktop */}
        <div className="mx-auto hidden max-w-[144rem] items-center justify-between p-2 sm:flex lg:px-8">
          <NextLink className="flex flex-col no-underline" href={HOME_PAGE_ROUTE}>
            {logo ? (
              <div className="relative h-[3.5rem] w-[15rem]">
                <Image
                  alt={logo.data?.attributes.alternativeText || ''}
                  src={logo.data?.attributes.url || ''}
                />
              </div>
            ) : (
              <h1 className="text-h2 font-bold ">{logoTitle}</h1>
            )}
            {logoDescription && <div className="text-small mt-0.5 block">{logoDescription}</div>}
          </NextLink>
          <nav className="flex gap-2">
            {links?.map(({ label, path, textColor }) => (
              <Link
                href={getHomeRoute(path)}
                key={path}
                label={label || ''}
                style={{ ...(textColor ? { color: textColor } : {}) }}
                variant="styled"
              />
            ))}
            <NextLink className="styled-link" href="/design-system">
              <div className="text-preamble">design system</div>
            </NextLink>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
