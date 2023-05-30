import clsx from 'clsx';
import { IoMdCheckmark } from 'react-icons/io';

export type CheckboxLabelProps = {
  checked: boolean;
  label: string;
};

const CheckboxLabel = ({ checked, label }: CheckboxLabelProps) => {
  const checkedBackgroundStyle = checked ? 'bg-orange ' : 'bg-middleGrey';
  return (
    <div className="flex gap-1 items-center">
      <div
        className={clsx(
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
