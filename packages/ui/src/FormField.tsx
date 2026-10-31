import React, { useId } from 'react';
import { cn } from './utils';

interface FieldWrapperProps {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  children: (id: string, describedBy: string) => React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FieldWrapperProps> = ({
  label,
  helperText,
  error,
  required,
  children,
  className,
}) => {
  const id = useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  const describedBy = [error ? errorId : null, helperText ? helperId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#0A1128] dark:text-[#F4F7FB] flex items-center gap-1">
          {label}
          {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
      )}
      {children(id, describedBy)}
      {helperText && !error && (
        <p id={helperId} className="text-xs text-[#4A5878] dark:text-[#A9B6D3]">
          {helperText}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full min-h-[44px] px-3.5 py-2.5 rounded-lg text-sm transition-all',
          'bg-white dark:bg-[#0A1128] text-[#0A1128] dark:text-[#F4F7FB]',
          'border border-[#D8E0EE] dark:border-[#22305A]',
          'placeholder:text-[#4A5878]/60 dark:placeholder:text-[#A9B6D3]/50',
          'focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full min-h-[120px] px-3.5 py-2.5 rounded-lg text-sm transition-all',
          'bg-white dark:bg-[#0A1128] text-[#0A1128] dark:text-[#F4F7FB]',
          'border border-[#D8E0EE] dark:border-[#22305A]',
          'placeholder:text-[#4A5878]/60 dark:placeholder:text-[#A9B6D3]/50',
          'focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'w-full min-h-[44px] px-3.5 py-2.5 rounded-lg text-sm transition-all appearance-none cursor-pointer',
          'bg-white dark:bg-[#0A1128] text-[#0A1128] dark:text-[#F4F7FB]',
          'border border-[#D8E0EE] dark:border-[#22305A]',
          'focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';
