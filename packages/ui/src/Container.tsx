import React from 'react';
import { cn } from './utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide';
}

export const Container: React.FC<ContainerProps> = ({
  className,
  size = 'default',
  children,
  ...props
}) => {
  const maxSizes = {
    narrow: 'max-w-3xl',
    default: 'max-w-[1140px]',
    wide: 'max-w-[1280px]',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        maxSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}) => {
  return (
    <div
      className={cn(
        'mb-10 sm:mb-14',
        align === 'center' ? 'mx-auto text-center max-w-2xl' : 'text-left max-w-2xl',
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-primary font-semibold mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text leading-snug">
        {title}
      </h2>
      {description && (
        <p className="mt-2.5 text-xs sm:text-sm text-text-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
