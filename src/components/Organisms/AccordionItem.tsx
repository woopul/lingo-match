import clsx from 'clsx';
import React, { ReactElement, ReactNode } from 'react';
import { BsChevronDown } from 'react-icons/bs';

export type AccordionItemProps = {
  bold?: boolean;
  children?: ReactNode;
  className?: string;
  expanded?: boolean;
  icon?: ReactElement | null;
  shouldBeExpandable?: boolean;
  title: ReactNode;
};

const AccordionItem = ({
  bold = false,
  children,
  className,
  expanded = false,
  icon: IconComponent,
  shouldBeExpandable = true,
  title,
}: AccordionItemProps) => {
  const [isExpanded, setIsExpanded] = React.useState(expanded);

  return (
    <div className={clsx('w-full p-2', className)}>
      <button
        className={clsx('flex w-full items-center  text-paragraph', bold && 'font-bold')}
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        {IconComponent && IconComponent} {title}
        {shouldBeExpandable && (
          <BsChevronDown
            className={clsx(' transition-rotate duration-300 ml-auto', isExpanded && 'rotate-180')}
          />
        )}
      </button>

      <div
        className={clsx(
          'grid transition-[grid-template-rows] ease-in-out duration-[500ms]',
          shouldBeExpandable ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
          isExpanded && shouldBeExpandable && 'grid-rows-[1fr]',
        )}
      >
        <div className="overflow-hidden pt-1">{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
