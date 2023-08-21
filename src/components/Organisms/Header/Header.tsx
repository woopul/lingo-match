import { Image, Link } from '@lingo-match/components';
import { LinkDTO } from '@lingo-match/components/Atoms/Link';
import { BaseResponseDataWrapper } from '@lingo-match/types/strapi/baseApiResponse';
import { StrapiMediaType } from '@lingo-match/types/strapi/shared';
import clsx from 'clsx';
import NextLink from 'next/link';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

import { MenuMobile } from './MenuMobille';

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
      <MenuMobile
        // Tailwind do not wanna see this height if its dynamic value taken from headerHeight
        className={`top-[6.7rem]`}
        headerHight={headerHeight.mobile}
        isOpen={isMenuOpen}
        links={links}
      />
      <header
        className={clsx(
          `sticky top-0 z-20 h-${headerHeight.mobile} relative w-full bg-gradient-to-b from-primary-600 to-[#9447fe] text-white desktop:h-${headerHeight.desktop}`,
          className,
        )}
      >
        {/* Header mobile */}
        <div className="relative z-[22] flex w-full items-center justify-between px-2 py-2 sm:hidden">
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
          </NextLink>
          <button onClick={handleMenuButtonClick}>
            <FiMenu className={clsx('h-3.5 w-3.5', isMenuOpen && 'hidden')} />
            <IoClose className={clsx('fill:white -mr-[3px]', !isMenuOpen && 'hidden')} size={35} />
          </button>
        </div>
        {/* Header desktop */}
        <div className="mx-auto hidden max-w-[144rem] items-center justify-between px-8 py-2 sm:flex">
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
            {logoDescription && <div className="text-small mt-0.5 block">{logoDescription}</div>}
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
    </>
  );
};

export default Header;
