import { Image } from '@lingo-match/components';
import { cn } from '@lingo-match/utlis/cn';
import React from 'react';

export type LabelProps = {
  className?: string;
  iconSrc: string | undefined;
  label: string;
};

const Label = ({ className, iconSrc, label }: LabelProps) => {
  return (
    <div className={cn('text-small flex gap-1', className)}>
      {iconSrc && (
        <div className="relative h-[2.1rem] w-[2.1rem] shrink-0">
          <Image alt="" src={iconSrc} />
        </div>
      )}
      <div>{label}</div>
    </div>
  );
};

export default Label;
