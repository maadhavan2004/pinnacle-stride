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
      'inline-flex items-center justify-center font-medium transition-all duration-150 select-none ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ' +
      'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.985]';

    const variants = {
      // Vercel / Linear inspired adaptive primary
      primary:
        'bg-text text-bg hover:opacity-90 shadow-sm border border-transparent font-medium',
      secondary:
        'bg-surface hover:bg-surface-hover text-text border border-border shadow-xs',
      outline:
        'bg-transparent border border-border text-text hover:bg-surface-hover',
      ghost:
        'bg-transparent hover:bg-surface-hover text-text-muted hover:text-text',
      link:
        'bg-transparent text-primary hover:underline underline-offset-4 p-0 h-auto min-h-0',
    };

    const sizes = {
      sm: 'text-xs h-8 px-3 rounded-md gap-1.5',
      md: 'text-[13px] h-9 px-4 rounded-md gap-2',
      lg: 'text-sm h-11 px-5 rounded-lg gap-2',
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
            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
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
