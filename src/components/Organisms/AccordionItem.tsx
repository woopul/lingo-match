import { cn } from '@lingo-match/utlis/cn';
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
    <div className={cn('w-full p-2', className)}>
      <button
        className={cn(
          'text-paragraph flex w-full  items-center',
          bold && 'font-bold',
          !shouldBeExpandable && 'cursor-default',
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        {IconComponent && IconComponent} {title}
        {shouldBeExpandable && (
          <BsChevronDown
            className={cn(' transition-rotate ml-auto duration-300', isExpanded && 'rotate-180')}
          />
        )}
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-500 ease-in-out',
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
