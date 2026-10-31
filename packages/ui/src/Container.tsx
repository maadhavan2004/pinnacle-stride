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
    narrow: 'max-w-4xl',
    default: 'max-w-[1200px]',
    wide: 'max-w-[1400px]',
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
        'max-w-3xl mb-12 sm:mb-16',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block text-xs sm:text-sm font-mono uppercase tracking-wider text-[#0EA5A4] dark:text-[#2DD4BF] font-semibold mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A1128] dark:text-[#F4F7FB] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
