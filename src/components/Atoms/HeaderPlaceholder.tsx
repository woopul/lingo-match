import Link from 'next/link';

const HeaderPlaceholder = () => (
  <div className="py-2 px-5 flex backdrop-blur-xl justify-between items-center w-full sticky z-10 top-0 shadow-2xl bg-inherit">
    <Link href="/" className="no-underline">
      <h1 className="text-h2 font-bold ">LingoMatch</h1>
    </Link>
    <nav className="flex gap-2">
      <Link href="/" className="styled-link">
        <div className="text-preamble">home</div>
      </Link>
      <Link href="/design-system" className="styled-link">
        <div className="text-preamble">design system</div>
      </Link>
    </nav>
  </div>
);

export default HeaderPlaceholder;
