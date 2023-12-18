import { cn } from '@lingo-match/utlis/cn';
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react';
import { IoMdCheckmark } from 'react-icons/io';

type CheckboxProps = {
  align?: 'center' | 'start';
  className?: string;
  id: string;
  label: ReactNode;
  labelFullWidth?: boolean;
  onChange?: () => void;
  positionReversed?: boolean;
  variant?: 'default' | 'toggle' | 'icon' | 'label';
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef(
  (
    {
      align = 'center',
      checked,
      className,
      color,
      defaultChecked,
      disabled,
      id,
      label,
      labelFullWidth,
      onChange,
      positionReversed,
      variant = 'icon',
      ...rest
    }: CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [isChecked, setIsChecked] = useState(checked ?? false);
    const checkedBackgroundStyle =
      (checked ?? isChecked) || defaultChecked ? 'bg-orange ' : 'bg-lightGrey';

    const handleOnChange = () => {
      setIsChecked(!isChecked);
      onChange && onChange();
    };

    return (
      <div
        className={cn(
          'relative flex desktop:hover:opacity-60',
          positionReversed && 'flex-row-reverse',
          disabled && 'opacity-30',
          checked && 'opacity-100',
          align === 'center' && 'items-center',
          align === 'start' && 'items-start',
          className,
        )}
      >
        <input
          checked={checked ?? isChecked}
          className={cn(
            'peer absolute left-0 top-0 z-10 m-0 cursor-pointer p-0 opacity-0 disabled:pointer-events-none',
            variant === 'toggle' ? 'h-2.5 w-5.5' : 'h-full w-2.3',
          )}
          defaultChecked={defaultChecked}
          disabled={disabled}
          id={id}
          onChange={handleOnChange}
          ref={ref}
          type="checkbox"
          {...rest}
        />
        {(variant === 'default' || 'icon' === variant) && (
          <div
            className={cn(
              'relative flex h-2.3 w-2.3 shrink-0 items-center justify-center overflow-hidden hover:cursor-pointer',
              align === 'start' && 'mt-1',
              checkedBackgroundStyle,
            )}
            onClick={handleOnChange}
          >
            {(checked ?? isChecked) && variant === 'icon' && (
              <div className="ml-[1px]">
                <IoMdCheckmark />
              </div>
            )}
          </div>
        )}
        {variant === 'toggle' && (
          <div
            className="peer-focus:ring-lightGray relative h-[2rem] w-[3.9rem] shrink-0 cursor-pointer rounded-full border
          bg-lighterGrey after:absolute after:h-[1.8rem] after:w-[1.8rem] after:rounded-full after:bg-white after:transition-all after:content-['']
          peer-checked:bg-orange peer-checked:after:translate-x-[100%] peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-1"
            onClick={handleOnChange}
          />
        )}
        <label
          className={cn(
            'cursor-pointer text-12 leading-18 -tracking-1 desktop:text-14 desktop:leading-20 desktop:-tracking-0',
            labelFullWidth ? 'w-full' : 'w-fit',
            variant === 'label'
              ? 'rounded-full bg-lightGrey px-1.5 py-0.5 peer-checked:bg-orange'
              : 'pl-1',
          )}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
