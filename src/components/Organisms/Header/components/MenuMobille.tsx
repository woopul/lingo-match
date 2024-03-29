import { Link } from '@lingo-match/components';
import { LinkDTO } from '@lingo-match/components/Atoms/Link';
import { getHomeRoute } from '@lingo-match/helpers/getHomeRoute';
import { useHeaderHeight } from '@lingo-match/hooks';
import { cn } from '@lingo-match/utlis/cn';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

export type MenuMobileProps = {
  className?: string;
  close: () => void;
  isOpen: boolean;
  links?: LinkDTO[];
};
export const MenuMobile = ({ className, close, isOpen, links }: MenuMobileProps) => {
  const headerHeight = useHeaderHeight();
  const [initialised, setInitialised] = useState(false);
  const mobileNav = useRef(null);

  useEffect(() => {
    setInitialised(true);
  }, []);

  useEffect(() => {
    const mobileNavTarget = mobileNav.current;

    if (isOpen && mobileNavTarget) {
      const storedRequestAnimationFrame = window.requestAnimationFrame;
      window.requestAnimationFrame = () => 50;
      disableBodyScroll(mobileNavTarget, { reserveScrollBarGap: true });
      window.requestAnimationFrame = storedRequestAnimationFrame;
    }

    return () => clearAllBodyScrollLocks();
  }, [isOpen]);

  if (!initialised) {
    return null;
  }

  return createPortal(
    <nav
      className={cn(
        `fixed inset-0 z-20 bg-white p-2 capitalize text-black transition-transform duration-500 sm:hidden`,
        !isOpen && '-translate-x-full',
        className,
      )}
      ref={mobileNav}
      style={{ paddingTop: headerHeight }}
    >
      <ul className="pt-2">
        {links?.map(({ label, path, textColor }) => (
          <li className="mx-auto pl-1 pt-2" key={path}>
            <Link
              href={getHomeRoute(path)}
              label={label || ''}
              style={{ color: textColor || '', fontSize: '18px' }}
              variant="styled"
            />
          </li>
        ))}
      </ul>
    </nav>,
    document.body,
  );
};
