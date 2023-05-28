import clsx from 'clsx';
import React, { ReactElement, ReactNode } from 'react';
import { BsChevronDown } from 'react-icons/bs';

export type AccordionItemProps = {
  children?: ReactNode;
  expanded?: boolean;
  icon?: ReactElement;
  title: string;
};

const AccordionItem = ({
  children,
  expanded = false,
  icon: IconComponent,
  title,
}: AccordionItemProps) => {
  const [isExpanded, setIsExpanded] = React.useState(expanded);

  return (
    <div className="w-full p-2">
      <button
        className="flex w-full justify-between items-center font-bold text-paragraph"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {IconComponent && IconComponent} <span>{title}</span>{' '}
        <BsChevronDown
          className={clsx(' transition-rotate duration-300', isExpanded && 'rotate-180')}
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
