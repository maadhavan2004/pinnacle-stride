import React from 'react';
import { cn } from './utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border p-6 transition-all duration-200',
          'bg-white border-[#D8E0EE] text-[#0A1128]',
          'dark:bg-[#131F42] dark:border-[#22305A] dark:text-[#F4F7FB]',
          hoverEffect &&
            'hover:-translate-y-1 hover:shadow-lg hover:border-[#1D4ED8]/40 dark:hover:border-[#3B82F6]/50',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
