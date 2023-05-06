import Link from 'next/link';

export type HeaderProps = {
  links?: {
    label: string;
    path: string;
  };
  logo?: string;
  logoDescription?: string;
};

const Header = (props: HeaderProps) => (
  <div className="bg-primary-500 w-full sticky z-10 top-0 shadow-2xl">
    <div className="py-2 px-5 flex justify-between items-center max-w-[144rem] mx-auto">
      <Link className="no-underline" href="/">
        <h1 className="text-h2 font-bold ">LingoMatch</h1>
      </Link>
      <nav className="flex gap-2">
        <Link className="styled-link" href="/">
          <div className="text-preamble">home</div>
        </Link>
        <Link className="styled-link" href="/design-system">
          <div className="text-preamble">design system</div>
        </Link>
      </nav>
    </div>
  </div>
);

export default Header;
