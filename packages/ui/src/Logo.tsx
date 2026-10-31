import React from 'react';
import { cn } from './utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true, size = 'md' }) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg', subtext: 'text-[9px]' },
    md: { icon: 36, text: 'text-xl', subtext: 'text-[11px]' },
    lg: { icon: 48, text: 'text-2xl', subtext: 'text-[13px]' },
  };

  const { icon, text, subtext } = sizeMap[size];

  return (
    <div className={cn('inline-flex items-center gap-3 select-none', className)}>
      {/* Peak & Path Emblem */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105 duration-200"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="psPeakGrad" x1="6" y1="42" x2="38" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1D4ED8" />
            <stop offset="0.6" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#0EA5A4" />
          </linearGradient>
          <linearGradient id="psPathGrad" x1="10" y1="38" x2="36" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2DD4BF" />
            <stop offset="1" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        {/* Outer Peak (Mountain silhouette) */}
        <path
          d="M24 6L40 38H8L24 6Z"
          fill="url(#psPeakGrad)"
          fillOpacity="0.2"
          stroke="url(#psPeakGrad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner Peak Contour */}
        <path
          d="M24 14L34 35H14L24 14Z"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Upward Ascending Stride Path */}
        <path
          d="M12 36C18 33 21 27 24 20C26 15 28 11 31 8"
          stroke="url(#psPathGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Summit Beacon Dot */}
        <circle cx="31" cy="8" r="3" fill="#2DD4BF" className="animate-pulse" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn('font-bold tracking-tight text-white dark:text-white', text)}>
            Pinnacle<span className="text-[#3B82F6] dark:text-[#2DD4BF]">Stride</span>
          </span>
          <span className={cn('text-[#4A5878] dark:text-[#A9B6D3] uppercase tracking-widest font-mono mt-0.5', subtext)}>
            Build Beyond
          </span>
        </div>
      )}
    </div>
  );
};
