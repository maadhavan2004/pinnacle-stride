'use client';

import React from 'react';

export const HeroPathAnimation: React.FC = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10"
      aria-hidden="true"
    >
      {/* 1. Ambient Cosmic Nebula Glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-b from-purple-600/18 via-violet-600/10 to-transparent blur-[130px] rounded-full opacity-80" />
      <div className="absolute top-[180px] -right-[150px] w-[500px] h-[350px] bg-gradient-to-b from-indigo-600/10 via-sky-600/5 to-transparent blur-[140px] rounded-full opacity-60" />

      {/* 2. Architectural Coordinate Grid with Cosmic Radial Fade */}
      <div className="absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_60%,transparent_100%)] opacity-70" />

      {/* 3. Cosmic Starfield & Trajectory Vector */}
      <svg
        className="w-full h-full max-w-6xl mx-auto opacity-70 dark:opacity-60"
        viewBox="0 0 1200 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="cosmicOrbit" x1="100" y1="450" x2="1050" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="35%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#c084fc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
          </linearGradient>

          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Constellation Guide Coordinates */}
        <line x1="150" y1="420" x2="1050" y2="420" stroke="currentColor" strokeWidth="0.75" strokeDasharray="6 6" className="text-border/40" />
        <line x1="250" y1="300" x2="950" y2="300" stroke="currentColor" strokeWidth="0.75" strokeDasharray="6 6" className="text-border/40" />
        <line x1="400" y1="180" x2="800" y2="180" stroke="currentColor" strokeWidth="0.75" strokeDasharray="6 6" className="text-border/40" />

        {/* Orbit Rings / Elliptical Horizons */}
        <ellipse cx="600" cy="480" rx="550" ry="240" stroke="currentColor" strokeWidth="0.75" strokeDasharray="8 8" className="text-border/25" />
        <ellipse cx="600" cy="480" rx="380" ry="160" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" className="text-border/20" />

        {/* Ascending Stride Cosmic Trajectory */}
        <path
          d="M180,430 C360,400 480,290 620,180 C740,90 860,65 980,50"
          stroke="url(#cosmicOrbit)"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          filter="url(#glowFilter)"
        />

        {/* Primary Orbital Beacon (Pinnacle Stride Destination) */}
        <circle cx="980" cy="50" r="4.5" fill="#38bdf8" />
        <circle cx="980" cy="50" r="10" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="980" cy="50" r="18" fill="none" stroke="#a855f7" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.3" />

        {/* Subtle Constellation Node Stars */}
        <circle cx="180" cy="430" r="2.5" fill="#8b5cf6" opacity="0.6" />
        <circle cx="420" cy="340" r="2" fill="#c084fc" opacity="0.7" />
        <circle cx="620" cy="180" r="3" fill="#a855f7" opacity="0.8" />
        <circle cx="780" cy="115" r="2.5" fill="#38bdf8" opacity="0.7" />

        {/* Distant Twinkling Celestial Particles */}
        <circle cx="120" cy="120" r="1.5" fill="#ffffff" opacity="0.5" className="animate-pulse" />
        <circle cx="280" cy="80" r="1.2" fill="#a855f7" opacity="0.6" />
        <circle cx="340" cy="220" r="1" fill="#ffffff" opacity="0.4" />
        <circle cx="510" cy="95" r="1.5" fill="#38bdf8" opacity="0.6" className="animate-pulse" />
        <circle cx="720" cy="60" r="1.2" fill="#ffffff" opacity="0.7" />
        <circle cx="890" cy="190" r="1.5" fill="#c084fc" opacity="0.5" className="animate-pulse" />
        <circle cx="1060" cy="140" r="1.2" fill="#ffffff" opacity="0.4" />
        <circle cx="1120" cy="310" r="1" fill="#a855f7" opacity="0.5" />
        <circle cx="210" cy="260" r="1.2" fill="#38bdf8" opacity="0.4" />
      </svg>
    </div>
  );
};
