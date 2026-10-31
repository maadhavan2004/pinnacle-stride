import React from 'react';
import { cn } from './utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'product' | 'portfolio' | 'client' | 'status-green' | 'status-amber' | 'status-blue';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-mono font-medium rounded-full select-none';

  const variants = {
    default:
      'bg-[#F4F7FB] dark:bg-[#131F42] text-[#4A5878] dark:text-[#A9B6D3] border border-[#D8E0EE] dark:border-[#22305A]',
    product:
      'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30',
    portfolio:
      'bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30',
    client:
      'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30',
    'status-green':
      'bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/30',
    'status-amber':
      'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30',
    'status-blue':
      'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/30',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
