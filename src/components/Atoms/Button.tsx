import clsx from 'clsx';
import React, { forwardRef } from 'react';

export type ButtonVariantType = 'full' | 'link' | 'text';

export type ThemeType = 'black' | 'primary' | 'secondary';

export type ButtonProps = {
  color?: ThemeType;
  cy?: string;
  cyId?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  height?: 'low' | 'high' | 'medium' | 'full';
  inline?: boolean;
  variant?: ButtonVariantType;
} & React.ComponentPropsWithoutRef<'button'>;

const BUTTON_STYLE_MAP = {
  black_full:
    'bg-black text-white hoover:bg-opacity-75 disabled:bg-opacity-50 disabled:cursor-initial',
  black_link: 'text-black underline hover:font-bold disabled:opacity-20 disabled:font-normal',
  black_text: 'text-black disabled:opacity-20',
  primary_full: 'bg-primary-400 text-white disabled:bg-primary-200 disabled:cursor-initial',
  primary_link:
    'text-primary-500 underline hover:font-bold disabled:opacity-20 disabled:font-normal',
  primary_text: 'text-primary-500',
  secondary_full:
    'bg-orange text-black disabled:bg-lighterGrey disabled:opacity-50 disabled:text-darkGrey',
  secondary_link: 'text-orange underline hover:font-bold disabled:opacity-20 disabled:font-normal',
  secondary_text: 'text-orange',
};
const BUTTON_HEIGHT_MAP = {
  full: 'h-full',
  high: 'h-4',
  low: 'h-2',
  medium: 'h-3',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      color = 'black',
      cyId,
      disabled = false,
      fullWidth = false,
      height,
      inline = false,
      type = 'button',
      variant = 'full',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        {...props}
        className={clsx(
          'items-center justify-center gap-0.25 transition-all w-fit rounded-full',
          inline ? 'inline' : 'flex',
          variant === 'link' || variant === 'text'
            ? 'items-start gap-1 px-0 text-12 leading-18 desktop:text-14 desktop:leading-20'
            : 'px-3.25 py-1 text-12 leading-18 -tracking-1 desktop:h-5 desktop:px-4.5 desktop:text-14 desktop:leading-20 desktop:-tracking-0',
          fullWidth && 'w-full',
          height && BUTTON_HEIGHT_MAP[height],
          BUTTON_STYLE_MAP[`${color}_${variant}`],
          className,
        )}
        disabled={disabled}
        ref={ref}
        // eslint-disable-next-line react/button-has-type
        type={type}
      />
    );
  },
);

Button.displayName = 'Button';

export default Button;
