import { HOME_PAGE_ROUTE } from '@lingo-match/constants/routes';
import Link from 'next/link';

const HeaderPlaceholder = () => (
  <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-inherit px-5 py-2 shadow-2xl backdrop-blur-xl">
    <Link className="no-underline" href={HOME_PAGE_ROUTE}>
      <h1 className="text-h2 font-bold ">LingoMatch</h1>
    </Link>
    <nav className="flex gap-2">
      <Link className="styled-link" href={HOME_PAGE_ROUTE}>
        <div className="text-preamble">home</div>
      </Link>
      <Link className="styled-link" href="/design-system">
        <div className="text-preamble">design system</div>
      </Link>
    </nav>
  </div>
);

export default HeaderPlaceholder;
