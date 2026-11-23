import React from 'react';
import { cn } from './utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'product'
    | 'portfolio'
    | 'client'
    | 'cosmic'
    | 'status-green'
    | 'status-amber'
    | 'status-blue';
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  showDot = true,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-mono font-medium rounded-full select-none transition-colors border';

  const dotColors = {
    default: 'bg-text-subtle',
    product: 'bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.8)]',
    portfolio: 'bg-emerald-400',
    client: 'bg-sky-400',
    cosmic: 'bg-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.8)]',
    'status-green': 'bg-emerald-400',
    'status-amber': 'bg-amber-400',
    'status-blue': 'bg-blue-400',
  };

  const variants = {
    default:
      'bg-surface-hover/80 text-text-muted border-border',
    product:
      'bg-purple-500/10 text-purple-400 dark:text-purple-300 border-purple-500/25',
    portfolio:
      'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20',
    client:
      'bg-sky-500/10 text-sky-500 dark:text-sky-400 border-sky-500/20',
    cosmic:
      'bg-violet-500/10 text-violet-400 dark:text-violet-300 border-violet-500/30',
    'status-green':
      'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20',
    'status-amber':
      'bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20',
    'status-blue':
      'bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5 leading-none',
    md: 'text-[11px] px-2.5 py-1 gap-1.5 leading-none',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {showDot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
