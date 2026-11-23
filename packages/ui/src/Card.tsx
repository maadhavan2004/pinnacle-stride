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
          'rounded-xl border border-border bg-surface/90 backdrop-blur-md text-text p-6 transition-all duration-200 relative overflow-hidden',
          hoverEffect &&
            'hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5',
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
