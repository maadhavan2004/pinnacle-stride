'use client';

import React from 'react';

export const HeroPathAnimation: React.FC = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10"
      aria-hidden="true"
    >
      {/* Ambient subtle radial glow (Linear / Vercel horizon light) */}
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-[120px] rounded-full opacity-70" />

      {/* Architectural subtle coordinate mesh */}
      <div className="absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

      {/* Minimalist Peak & Ascending Horizon Vector */}
      <svg
        className="w-full h-full max-w-5xl mx-auto opacity-20 dark:opacity-15"
        viewBox="0 0 1000 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="vectorPath" x1="0" y1="360" x2="800" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--primary)" stopOpacity="0.8" />
            <stop offset="1" stopColor="var(--text)" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Subtle geometric contour coordinates */}
        <line x1="100" y1="350" x2="900" y2="350" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="260" x2="800" y2="260" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="350" y1="160" x2="650" y2="160" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Ascending Stride Trajectory */}
        <path
          d="M150,350 C320,330 420,240 500,160 C560,100 600,60 680,40"
          stroke="url(#vectorPath)"
          strokeWidth="1.75"
          fill="none"
          strokeLinecap="round"
        />

        {/* Waypoint indicator dot */}
        <circle cx="680" cy="40" r="3" fill="var(--primary)" />
      </svg>
    </div>
  );
};
