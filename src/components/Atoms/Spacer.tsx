import { cn } from '@lingo-match/utlis/cn';

export type SpacerProps = {
  className?: string;
  dividerPosition: 'top' | 'center' | 'bottom';
  size?: 'S' | 'M' | 'L' | 'XL';
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
  bottom: 'border-b border-lightGrey',
  center: 'before:w-full before:h-[0.1rem] before:bg-lightGrey flex items-center',
  top: 'border-t border-lightGrey',
};

const Spacer = ({ className, dividerPosition, size, withDivider }: SpacerProps) => (
  <div
    className={cn(
      size && spacerSizeClassMap[size],
      withDivider && dividerPositionClassMap[dividerPosition],
      className,
    )}
  ></div>
);

export default Spacer;
