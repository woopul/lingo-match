import { cn } from '@lingo-match/utlis/cn';

export type SpacerProps = {
  dividerPosition: 'top' | 'center' | 'bottom';
  size: 'S' | 'M' | 'L' | 'XL';
  withDivider?: boolean;
};

const spacerSizeClassMap = {
  L: 'h-8',
  M: 'h-4',
  S: 'h-2',
  XL: 'h-12',
  XXL: 'h-16',
};

const dividerPositionClassMap = {
  bottom: 'border-b border-darkGrey',
  center: 'before:w-full before:h-[0.1rem] before:bg-darkGrey flex items-center',
  top: 'border-t border-darkGrey',
};

const Spacer = ({ dividerPosition, size, withDivider }: SpacerProps) => (
  <div
    className={cn(spacerSizeClassMap[size], {
      [dividerPositionClassMap[dividerPosition]]: withDivider,
    })}
  ></div>
);

export default Spacer;
