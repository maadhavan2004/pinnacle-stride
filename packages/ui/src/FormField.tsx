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
        <label
          htmlFor={id}
          className="text-xs font-medium text-text-muted flex items-center gap-1 select-none"
        >
          {label}
          {required && <span className="text-red-500 font-mono">*</span>}
        </label>
      )}
      {children(id, describedBy)}
      {helperText && !error && (
        <p id={helperId} className="text-[11px] text-text-subtle">
          {helperText}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-[11px] font-medium text-danger flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-danger shrink-0" />
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
          'w-full h-9 px-3 rounded-lg text-xs transition-colors',
          'bg-surface text-text border border-border',
          'placeholder:text-text-subtle/60',
          'focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary',
          error && 'border-danger focus:ring-danger focus:border-danger',
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
          'w-full p-3 rounded-lg text-xs transition-colors resize-y min-h-[100px]',
          'bg-surface text-text border border-border',
          'placeholder:text-text-subtle/60',
          'focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary',
          error && 'border-danger focus:ring-danger focus:border-danger',
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
          'w-full h-9 px-3 rounded-lg text-xs transition-colors appearance-none cursor-pointer',
          'bg-surface text-text border border-border',
          'focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary',
          error && 'border-danger focus:ring-danger focus:border-danger',
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
