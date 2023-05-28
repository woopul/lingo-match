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
  variant?: 'default' | 'toggle' | 'icon';
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
      onChange,
      variant = 'default',
      ...rest
    }: CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [isChecked, setIsChecked] = useState(checked ?? false);
    const checkedBackgroundStyle = isChecked || defaultChecked ? 'bg-orange ' : 'bg-middleGrey';

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
      onChange && onChange(e);
    };

    return (
      <div
        className={clsx(
          'relative flex desktop:hover:opacity-60',
          disabled && 'opacity-30',
          checked && 'opacity-100',
          align === 'center' && 'items-center',
          align === 'start' && 'items-start',
          className,
        )}
      >
        <input
          checked={isChecked}
          className={clsx(
            'absolute top-0 left-0 z-10 m-0 cursor-pointer p-0 opacity-0 disabled:pointer-events-none',
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
        {variant === 'default' || variant === 'icon' ? (
          <div
            className={clsx(
              'relative flex h-2.3 w-2.3 shrink-0 items-center justify-center overflow-hidden',
              align === 'start' && 'mt-1',
              checkedBackgroundStyle,
            )}
          >
            {isChecked && variant === 'icon' && (
              <div className="ml-[1px]">
                <IoMdCheckmark />
              </div>
            )}
          </div>
        ) : (
          <div
            className="peer-checked:bg-ring-lightGray peer h-2.5 w-5.5 border bg-white
          after:absolute after:top-[3px] after:left-[3px] after:h-1.7 after:w-2.3 after:bg-darkGray after:transition-all after:content-['']
          peer-checked:after:translate-x-[110%] peer-checked:after:border-white peer-checked:after:bg-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lightGray"
          />
        )}
        <label
          className="cursor-pointer pl-1 text-12 leading-18 -tracking-1 desktop:text-14 desktop:leading-20 desktop:-tracking-0"
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
