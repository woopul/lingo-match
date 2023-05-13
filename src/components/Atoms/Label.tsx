import { Image } from '@lingo-match/components';
import clsx from 'clsx';
import React from 'react';

export type LabelProps = {
  className?: string;
  iconSrc?: string;
  label: string;
};

const Label = ({ className, iconSrc, label }: LabelProps) => {
  return (
    <div className={clsx('flex gap-1', className)}>
      {iconSrc && (
        <div className="w-[2.1rem] relative">
          <Image alt="" src={iconSrc} />
        </div>
      )}
      <div>{label}</div>
    </div>
  );
};

export default Label;
