import React from 'react';
import { cn } from './utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 select-none min-h-[44px] ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 ' +
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-[#1D4ED8] hover:bg-[#1E40AF] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] text-white shadow-md hover:shadow-lg',
      secondary:
        'bg-[#F4F7FB] hover:bg-[#E5EDF7] dark:bg-[#131F42] dark:hover:bg-[#1B2A56] text-[#0A1128] dark:text-[#F4F7FB] border border-[#D8E0EE] dark:border-[#22305A]',
      outline:
        'bg-transparent border border-[#3B82F6] text-[#1D4ED8] dark:text-[#3B82F6] hover:bg-[#3B82F6]/10',
      ghost:
        'bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-[#0A1128] dark:text-[#F4F7FB]',
      link:
        'bg-transparent text-[#1D4ED8] dark:text-[#3B82F6] hover:underline underline-offset-4 p-0 min-h-0',
    };

    const sizes = {
      sm: 'text-sm px-3.5 py-1.5 gap-1.5 min-h-[40px]',
      md: 'text-base px-5 py-2.5 gap-2 min-h-[44px]',
      lg: 'text-lg px-7 py-3 gap-2.5 min-h-[48px]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
