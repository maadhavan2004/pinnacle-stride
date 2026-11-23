'use client';

import React from 'react';

export type WireStatus = 'hidden' | 'drawing' | 'completed';

interface ProcessConnectingWireProps {
  wireIndex: number; // 1 to 4
  status: WireStatus;
  progress: number; // 0 to 100
  isArrivalPulse: boolean;
  isFinaleWave: boolean;
  isFinaleSettled: boolean;
  direction?: 'horizontal' | 'vertical';
}

export const ProcessConnectingWire: React.FC<ProcessConnectingWireProps> = ({
  wireIndex,
  status,
  progress,
  isArrivalPulse,
  isFinaleWave,
  isFinaleSettled,
  direction = 'horizontal',
}) => {
  const isHidden = status === 'hidden';
  const isDrawing = status === 'drawing';
  const isCompleted = status === 'completed';

  // HORIZONTAL WIRE (DESKTOP)
  if (direction === 'horizontal') {
    return (
      <div
        className={`flex-shrink-0 w-8 md:w-10 lg:w-12 xl:w-14 h-8 flex items-center justify-center relative select-none transition-opacity duration-300 ${
          isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <svg
          className="w-full h-8 overflow-visible"
          viewBox="0 0 100 24"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Glow Filter for Circuit Line & Travelling Photon */}
            <filter id={`wireGlow-${wireIndex}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Linear Gradient for Wire */}
            <linearGradient id={`wireGrad-${wireIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* 1. Background Conduit Track */}
          <line
            x1="0"
            y1="12"
            x2="100"
            y2="12"
            stroke="#1b2038"
            strokeWidth="2"
            strokeDasharray="2 3"
          />

          {/* 2. Illuminated Energy Pathway */}
          {(!isHidden) && (
            <line
              x1="0"
              y1="12"
              x2="100"
              y2="12"
              stroke={`url(#wireGrad-${wireIndex})`}
              strokeWidth={isFinaleWave ? '3.5' : isDrawing ? '2.5' : '2'}
              strokeDasharray="100"
              strokeDashoffset={isCompleted || isFinaleWave || isFinaleSettled ? 0 : 100 - progress}
              filter={`url(#wireGlow-${wireIndex})`}
              className={`transition-all duration-300 ${
                isFinaleWave
                  ? 'filter drop-shadow-[0_0_12px_#c084fc] drop-shadow-[0_0_20px_#38bdf8]'
                  : isCompleted || isFinaleSettled
                  ? 'opacity-80'
                  : 'opacity-100'
              }`}
            />
          )}

          {/* 3. Travelling Photon Particle with Comet Tail */}
          {isDrawing && (
            <g>
              {/* Comet Tail */}
              <line
                x1={Math.max(0, progress - 16)}
                y1="12"
                x2={progress}
                y2="12"
                stroke="#c084fc"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.6"
              />
              {/* Main Particle Core */}
              <circle
                cx={progress}
                cy="12"
                r="3.5"
                fill="#ffffff"
                filter={`url(#wireGlow-${wireIndex})`}
                className="filter drop-shadow-[0_0_6px_#c084fc] drop-shadow-[0_0_12px_#38bdf8]"
              />
            </g>
          )}

          {/* 4. Origin Emission Node */}
          {(!isHidden) && (
            <circle
              cx="0"
              cy="12"
              r="2.5"
              fill={isDrawing && progress < 15 ? '#ffffff' : '#c084fc'}
              className={isDrawing && progress < 15 ? 'animate-ping' : ''}
            />
          )}

          {/* 5. Destination Arrival Ring */}
          {(isArrivalPulse || isCompleted || isFinaleWave || isFinaleSettled) && (
            <circle
              cx="100"
              cy="12"
              r={isArrivalPulse ? '4' : '2.5'}
              fill={isArrivalPulse ? '#38bdf8' : '#c084fc'}
              className={isArrivalPulse ? 'animate-ping' : ''}
            />
          )}
        </svg>
      </div>
    );
  }

  // VERTICAL WIRE (MOBILE)
  return (
    <div
      className={`w-full h-10 flex items-center justify-center relative my-0.5 select-none transition-opacity duration-300 ${
        isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <svg
        className="w-8 h-10 overflow-visible"
        viewBox="0 0 24 40"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`wireGradVert-${wireIndex}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* Conduit Track */}
        <line
          x1="12"
          y1="0"
          x2="12"
          y2="40"
          stroke="#1b2038"
          strokeWidth="2"
          strokeDasharray="2 3"
        />

        {/* Active Vertical Line */}
        {(!isHidden) && (
          <line
            x1="12"
            y1="0"
            x2="12"
            y2="40"
            stroke={`url(#wireGradVert-${wireIndex})`}
            strokeWidth={isFinaleWave ? '3.5' : '2.5'}
            strokeDasharray="40"
            strokeDashoffset={isCompleted || isFinaleWave || isFinaleSettled ? 0 : 40 - (40 * progress) / 100}
            className={
              isCompleted || isFinaleSettled || isFinaleWave
                ? 'transition-all duration-300 filter drop-shadow-[0_0_6px_#c084fc]'
                : ''
            }
          />
        )}

        {/* Travelling Particle (Vertical) */}
        {isDrawing && (
          <g>
            <line
              x1="12"
              y1={Math.max(0, (40 * progress) / 100 - 8)}
              x2="12"
              y2={(40 * progress) / 100}
              stroke="#c084fc"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            <circle
              cx="12"
              cy={(40 * progress) / 100}
              r="3.5"
              fill="#ffffff"
              className="filter drop-shadow-[0_0_6px_#c084fc] drop-shadow-[0_0_12px_#38bdf8]"
            />
          </g>
        )}

        {/* Origin Node */}
        {(!isHidden) && (
          <circle cx="12" cy="0" r="2.5" fill="#c084fc" />
        )}

        {/* Destination Arrival Node */}
        {(isArrivalPulse || isCompleted || isFinaleWave || isFinaleSettled) && (
          <circle
            cx="12"
            cy="40"
            r={isArrivalPulse ? '4' : '2.5'}
            fill="#38bdf8"
            className={isArrivalPulse ? 'animate-ping' : ''}
          />
        )}
      </svg>
    </div>
  );
};
