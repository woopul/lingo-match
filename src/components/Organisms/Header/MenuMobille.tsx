import { Link } from '@lingo-match/components';
import { LinkDTO } from '@lingo-match/components/Atoms/Link';
import clsx from 'clsx';

export type MenuMobileProps = {
  className?: string;
  headerHight: string;
  isOpen: boolean;
  links?: LinkDTO[];
};
export const MenuMobile = ({ className, isOpen, links }: MenuMobileProps) => (
  <nav
    className={clsx(
      `fixed z-20 flex w-full flex-col gap-2 bg-white p-2 uppercase text-black sm:hidden`,
      !isOpen && '-translate-y-full',
      className,
    )}
  >
    {links?.map(({ label, path, textColor }) => (
      <Link
        href={path || '/'}
        key={path}
        label={label || ''}
        style={{ color: textColor || '' }}
        variant="styled"
      />
    ))}
  </nav>
);
