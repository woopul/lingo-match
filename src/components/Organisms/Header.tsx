import { Link } from '@lingo-match/components';
import { LinkDTO } from '@lingo-match/components/Atoms/Link';
import clsx from 'clsx';
import NextLink from 'next/link';

export type HeaderDTO = {
  links?: LinkDTO[];
  logo?: string;
  logoDescription?: string;
};

export type HeaderProps = HeaderDTO & {
  className?: string;
};

const Header = ({ className, links, logo, logoDescription }: HeaderProps) => (
  <header
    className={clsx(
      'bg-primary-500 w-full h-max sticky z-10 top-0 shadow-2xl text-white',
      className,
    )}
  >
    <div className="py-2 px-8 flex justify-between items-center max-w-[144rem] mx-auto">
      <NextLink className="no-underline" href="/">
        <h1 className="text-h2 font-bold ">LingoMatch</h1>
      </NextLink>
      <nav className="flex gap-2">
        {links?.map(({ label, path }) => (
          <Link href={path || '/'} key={path} label={label} variant="styled" />
        ))}
        <NextLink className="styled-link" href="/design-system">
          <div className="text-preamble">design system</div>
        </NextLink>
      </nav>
    </div>
  </header>
);

export default Header;
