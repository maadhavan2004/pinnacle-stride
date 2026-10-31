'use client';

import React from 'react';

export const HeroPathAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10" aria-hidden="true">
      {/* Background Gradient Radials */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#1D4ED8]/20 via-[#0EA5A4]/15 to-transparent blur-3xl opacity-60 dark:opacity-40" />

      {/* Stylised Peak & Glowing Path SVG Canvas */}
      <svg
        className="w-full h-full max-w-7xl mx-auto opacity-35 dark:opacity-25"
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="600" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" stopOpacity="0.1" />
            <stop offset="1" stopColor="#0A1128" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="glowPathGrad" x1="100" y1="580" x2="600" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="1" />
          </linearGradient>

          <filter id="glowBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Isometric Grid Lines */}
        <g stroke="url(#gridGrad)" strokeWidth="0.75" strokeDasharray="3 3">
          <line x1="100" y1="600" x2="600" y2="80" />
          <line x1="300" y1="600" x2="600" y2="80" />
          <line x1="500" y1="600" x2="600" y2="80" />
          <line x1="700" y1="600" x2="600" y2="80" />
          <line x1="900" y1="600" x2="600" y2="80" />
          <line x1="1100" y1="600" x2="600" y2="80" />

          <line x1="0" y1="200" x2="1200" y2="200" />
          <line x1="0" y1="350" x2="1200" y2="350" />
          <line x1="0" y1="480" x2="1200" y2="480" />
        </g>

        {/* Stylised Mountain Ridgeline Silhouette */}
        <polygon
          points="600,80 850,550 350,550"
          fill="#131F42"
          fillOpacity="0.2"
          stroke="#22305A"
          strokeWidth="1.5"
        />
        <polygon
          points="600,80 720,550 480,550"
          fill="#1D4ED8"
          fillOpacity="0.08"
          stroke="#3B82F6"
          strokeOpacity="0.3"
          strokeWidth="1"
        />

        {/* Secondary Supporting Peaks */}
        <polygon
          points="400,240 580,550 220,550"
          fill="#0F1A38"
          fillOpacity="0.3"
          stroke="#22305A"
          strokeWidth="1"
        />
        <polygon
          points="800,220 980,550 620,550"
          fill="#0F1A38"
          fillOpacity="0.3"
          stroke="#22305A"
          strokeWidth="1"
        />

        {/* The Glowing Upward-Ascending Path */}
        <path
          d="M200,560 C380,510 440,430 480,340 C520,250 560,160 600,80"
          stroke="url(#glowPathGrad)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          filter="url(#glowBlur)"
        />

        {/* Waypoint Nodes along the path */}
        <circle cx="480" cy="340" r="4" fill="#3B82F6" />
        <circle cx="560" cy="160" r="5" fill="#2DD4BF" />
        <circle cx="600" cy="80" r="8" fill="#2DD4BF" filter="url(#glowBlur)" />
      </svg>
    </div>
  );
};
