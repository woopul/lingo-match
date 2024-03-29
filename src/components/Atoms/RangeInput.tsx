import { cn } from '@lingo-match/utlis/cn';
import React from 'react';

export type RangeSliderProps = {
  className?: string;
  id: string;
  max: number;
  min: number;
};

const RangeInput = ({ className, id, max, min }: RangeSliderProps) => {
  const handleInputChange = (e: any) => {
    let target = e.target;
    let rangeBarFilled = document.querySelector(`#${id} #range-bar-filled`);
    const min = target.min;
    const max = target.max;
    const val = target.value;
    const filledBarWidth = `${((val - min) / (max - min)) * 100}%`;

    rangeBarFilled?.setAttribute('style', `width: ${filledBarWidth}`);
  };

  return (
    <div className={cn('h-fit py-2', className)} id={id}>
      <div className="relative flex items-center ">
        <input
          className="custom-slider"
          max={max}
          min={min}
          onChange={handleInputChange}
          type="range"
        />
        <div
          className={cn('pointer-events-none absolute h-[2px] w-0 bg-orange')}
          id="range-bar-filled"
        ></div>
      </div>
    </div>
  );
};

export default RangeInput;
