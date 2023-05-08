import { Image, Link } from '@lingo-match/components';
import clsx from 'clsx';

export type LogoProps = {
  className?: string;
  src?: string;
};

const Logo = ({ className, src = './logo.svg' }: LogoProps) => (
  <Link href="/">
    <div className={clsx('w-[14.5rem] h-[4rem] relative', className)}>
      <Image alt="" className="object-contain" key={src} src={src!} />
    </div>
  </Link>
);

export default Logo;
