import clsx from 'clsx';
import React, { ReactElement, ReactNode } from 'react';
import { BsChevronDown } from 'react-icons/bs';

export type AccordionItemProps = {
  bold?: boolean;
  children?: ReactNode;
  className?: string;
  expanded?: boolean;
  icon?: ReactElement;
  title: ReactNode;
};

const AccordionItem = ({
  bold = false,
  children,
  className,
  expanded = false,
  icon: IconComponent,
  title,
}: AccordionItemProps) => {
  const [isExpanded, setIsExpanded] = React.useState(expanded);

  return (
    <div className={clsx('w-full p-2', className)}>
      <button
        className={clsx('flex w-full items-center  text-paragraph', bold && 'font-bold')}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {IconComponent && IconComponent} {title}
        <BsChevronDown
          className={clsx(' transition-rotate duration-300 ml-auto', isExpanded && 'rotate-180')}
        />
      </button>

      <div
        className={clsx(
          'grid grid-rows-[0fr] transition-[grid-template-rows] ease-in-out duration-[500ms]',
          isExpanded && 'grid-rows-[1fr]',
        )}
      >
        <div className="overflow-hidden pt-1">{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
