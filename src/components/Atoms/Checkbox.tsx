import clsx from 'clsx';
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
        className={clsx(
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
          className={clsx(
            'absolute top-0 left-0 z-10 m-0 cursor-pointer p-0 opacity-0 disabled:pointer-events-none peer',
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
            className={clsx(
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
            className="cursor-pointer peer-checked:bg-orange relative bg-lighterGrey h-[2rem] w-[3.9rem] border rounded-full
          after:absolute after:rounded-full after:h-[1.8rem] shrink-0 after:w-[1.8rem] after:bg-white after:transition-all after:content-['']
          peer-checked:after:translate-x-[100%] peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-lightGray"
            onClick={handleOnChange}
          />
        )}
        <label
          className={clsx(
            'cursor-pointer text-12 leading-18 -tracking-1 desktop:text-14 desktop:leading-20 desktop:-tracking-0',
            labelFullWidth ? 'w-full' : 'w-fit',
            variant === 'label'
              ? 'peer-checked:bg-orange rounded-full bg-lightGrey px-1.5 py-0.5'
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
