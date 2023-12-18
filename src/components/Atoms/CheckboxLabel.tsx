import { cn } from '@lingo-match/utlis/cn';
import { IoMdCheckmark } from 'react-icons/io';

export type CheckboxLabelProps = {
  checked: boolean;
  label: string;
};

const CheckboxLabel = ({ checked, label }: CheckboxLabelProps) => {
  const checkedBackgroundStyle = checked ? 'bg-orange ' : 'bg-lightGrey';
  return (
    <div className="flex items-center gap-1">
      <div
        className={cn(
          'relative flex h-2.3 w-2.3 shrink-0 items-center justify-center overflow-hidden',
          checkedBackgroundStyle,
        )}
      >
        {checked && (
          <div className="ml-[1px]">
            <IoMdCheckmark />
          </div>
        )}
      </div>
      <div className="text-paragraph">{label}</div>
    </div>
  );
};

export default CheckboxLabel;
