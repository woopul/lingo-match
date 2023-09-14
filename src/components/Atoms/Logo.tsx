import { Image, Link } from '@lingo-match/components';
import { HOME_PAGE_ROUTE } from '@lingo-match/constants/routes';
import clsx from 'clsx';

export type LogoProps = {
  className?: string;
  src?: string;
};

const Logo = ({ className, src = './logo.svg' }: LogoProps) => (
  <Link className={clsx(className)} href={HOME_PAGE_ROUTE}>
    <div className={clsx('relative h-[4rem] w-[14.5rem]')}>
      <Image alt="" className="object-contain" key={src} src={src!} />
    </div>
  </Link>
);

export default Logo;
