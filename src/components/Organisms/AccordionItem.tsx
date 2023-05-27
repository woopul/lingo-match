import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { BsChevronDown } from 'react-icons/bs';

export type AccordionItemProps = {
  content?: string;
  expanded?: boolean;
  icon?: ReactElement;
  title: string;
};

const AccordionItem = ({
  content,
  expanded = false,
  icon: IconComponent,
  title,
}: AccordionItemProps) => {
  const [isExpanded, setIsExpanded] = React.useState(expanded);

  return (
    <div className="w-full p-2">
      <button
        className="flex w-full justify-between items-center"
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
        <div className="overflow-hidden">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, libero nemo omnis placeat
          provident quaerat qui quia. Est harum, impedit!
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
