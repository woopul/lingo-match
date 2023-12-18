import { Image, Link } from '@lingo-match/components';
import { HOME_PAGE_ROUTE } from '@lingo-match/constants/routes';
import { cn } from '@lingo-match/utlis/cn';

export type LogoProps = {
  className?: string;
  src?: string;
};

const Logo = ({ className, src = './logo.svg' }: LogoProps) => (
  <Link className={cn(className)} href={HOME_PAGE_ROUTE}>
    <div className={cn('relative h-[4rem] w-[14.5rem]')}>
      <Image alt="" className="object-contain" key={src} src={src!} />
    </div>
  </Link>
);

export default Logo;
