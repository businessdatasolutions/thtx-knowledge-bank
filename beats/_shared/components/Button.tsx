import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Icon to display before the text */
  leftIcon?: React.ReactNode;
  /** Icon to display after the text */
  rightIcon?: React.ReactNode;
  /** Button content */
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
  secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-400',
  outline: 'bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-400',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';

/**
 * Button component with multiple variants and sizes.
 * Uses THTX brand colors and consistent styling.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    (disabled || loading) ? disabledStyles : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
};

export default Button;
