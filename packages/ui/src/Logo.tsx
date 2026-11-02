import React from 'react';
import { cn } from './utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true, size = 'md' }) => {
  const sizeMap = {
    sm: { icon: 20, text: 'text-sm', subtext: 'text-[9px]' },
    md: { icon: 24, text: 'text-[15px]', subtext: 'text-[10px]' },
    lg: { icon: 32, text: 'text-lg', subtext: 'text-[11px]' },
  };

  const { icon, text, subtext } = sizeMap[size];

  return (
    <div className={cn('inline-flex items-center gap-2.5 select-none group', className)}>
      {/* Precision Geometric Peak & Path Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200 group-hover:scale-105"
          aria-hidden="true"
        >
          {/* Outer Minimalist Peak Silhouette */}
          <path
            d="M12 2.5L21.5 19.5H2.5L12 2.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="text-text/80"
          />
          {/* Inner Ascending Stride Ray */}
          <path
            d="M7.5 19.5L12 11L14.5 15.5L17.5 9"
            stroke="var(--primary)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Summit Waypoint Dot */}
          <circle cx="17.5" cy="9" r="1.5" fill="var(--primary)" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn('font-semibold tracking-tight text-text flex items-center gap-0.5', text)}>
            Pinnacle<span className="text-text-muted font-normal">Stride</span>
          </span>
          <span className={cn('text-text-subtle font-mono tracking-widest uppercase mt-0.5', subtext)}>
            Engineering
          </span>
        </div>
      )}
    </div>
  );
};
