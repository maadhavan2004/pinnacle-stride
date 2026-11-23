'use client';

import React from 'react';
import { ProcessStage } from '@ps/content';
import {
  Compass,
  FileCode,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export type CardStatus =
  | 'hidden'
  | 'blinking'
  | 'forming'
  | 'typing'
  | 'completed';

interface ProcessStageCardProps {
  stage: ProcessStage;
  status: CardStatus;
  typedCount: number;
  isCurrentFocus: boolean;
  isSelected: boolean;
  isFinaleWave: boolean;
  isFinaleSettled: boolean;
  direction?: 'horizontal' | 'vertical';
  onClick: () => void;
}

export const ProcessStageCard: React.FC<ProcessStageCardProps> = ({
  stage,
  status,
  typedCount,
  isCurrentFocus,
  isSelected,
  isFinaleWave,
  isFinaleSettled,
  direction = 'horizontal',
  onClick,
}) => {
  const isHidden = status === 'hidden';
  const isBlinking = status === 'blinking';
  const isForming = status === 'forming';
  const isTyping = status === 'typing';
  const isCompleted = status === 'completed';

  // String targets for typing
  const numberTarget = `0${stage.step}`;
  const titleTarget = stage.title;
  const descTarget = stage.summary;

  const numLen = numberTarget.length; // 2
  const titleLen = titleTarget.length;
  const descLen = descTarget.length;
  const totalChars = numLen + titleLen + descLen;

  // Compute currently typed slices
  let typedNumber = '';
  let typedTitle = '';
  let typedDesc = '';
  let activeCaretAt: 'none' | 'number' | 'title' | 'desc' = 'none';

  if (isCompleted || isFinaleWave || isFinaleSettled) {
    typedNumber = numberTarget;
    typedTitle = titleTarget;
    typedDesc = descTarget;
    activeCaretAt = 'none';
  } else if (isTyping) {
    // 1. Number typing (chars 0 to 2)
    if (typedCount <= numLen) {
      typedNumber = numberTarget.slice(0, typedCount);
      activeCaretAt = 'number';
    } else {
      typedNumber = numberTarget;
      // 2. Title typing (chars 2 to 2 + titleLen)
      const titleProgress = typedCount - numLen;
      if (titleProgress <= titleLen) {
        typedTitle = titleTarget.slice(0, titleProgress);
        activeCaretAt = 'title';
      } else {
        typedTitle = titleTarget;
        // 3. Description typing
        const descProgress = typedCount - numLen - titleLen;
        typedDesc = descTarget.slice(0, descProgress);
        activeCaretAt = descProgress < descLen ? 'desc' : 'none';
      }
    }
  }

  // Icon visibility: appears once title starts typing or card is completed
  const showIcon =
    isCompleted || isFinaleWave || isFinaleSettled || (isTyping && typedCount >= numLen);

  // Footer visibility: appears once typing is nearly complete or card is completed
  const showFooter =
    isCompleted || isFinaleWave || isFinaleSettled || (isTyping && typedCount >= totalChars - 5);

  // Icon mapping
  const getStageIcon = (step: number) => {
    switch (step) {
      case 1:
        return Compass;
      case 2:
        return FileCode;
      case 3:
        return Code2;
      case 4:
        return ShieldCheck;
      case 5:
        return Rocket;
      default:
        return Sparkles;
    }
  };

  const Icon = getStageIcon(stage.step);

  return (
    <div
      onClick={!isHidden ? onClick : undefined}
      role={!isHidden ? 'button' : undefined}
      tabIndex={!isHidden ? 0 : -1}
      onKeyDown={(e) => {
        if (!isHidden && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Stage 0${stage.step}: ${stage.title}. ${stage.summary}`}
      className={`relative select-none transition-all duration-300 rounded-2xl ${
        direction === 'horizontal'
          ? 'flex-1 min-w-[170px] xl:min-w-[195px] p-4 xl:p-5 h-[230px] flex flex-col justify-between'
          : 'w-full p-4 min-h-[145px] flex flex-col justify-between'
      } ${
        isHidden
          ? 'opacity-0 pointer-events-none invisible'
          : isBlinking
          ? 'opacity-70 border border-primary/50 animate-pulse bg-surface/10 cursor-default'
          : isForming
          ? 'opacity-100 bg-surface/90 border border-primary shadow-[0_0_25px_rgba(147,51,234,0.35)] scale-[1.02] cursor-default'
          : isFinaleWave
          ? 'opacity-100 bg-surface/95 border border-accent ring-2 ring-accent/80 shadow-[0_0_35px_rgba(192,132,252,0.6)] scale-[1.03] cursor-pointer'
          : isSelected
          ? 'opacity-100 bg-surface/90 border border-accent ring-1 ring-accent/60 shadow-[0_0_20px_rgba(192,132,252,0.3)] cursor-pointer'
          : isCurrentFocus
          ? 'opacity-100 bg-surface/95 border border-primary shadow-[0_0_25px_rgba(147,51,234,0.35)] scale-[1.02] cursor-pointer'
          : isFinaleSettled
          ? 'opacity-100 bg-surface/85 border border-primary/60 shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:border-accent cursor-pointer'
          : isCompleted
          ? 'opacity-85 bg-surface/75 border border-border/80 hover:border-primary/40 cursor-pointer'
          : 'opacity-40'
      }`}
    >
      {/* Accessible screen-reader text with full content immediately (Section 10) */}
      <span className="sr-only">
        Stage 0{stage.step}: {stage.title}. {stage.summary}. Timeline: {stage.duration}.
      </span>

      {/* 1. FORMING STAGE: Progressive neon SVG border drawing clockwise */}
      {isForming && (
        <>
          {/* Spark at left edge for Box 1 */}
          {stage.step === 1 && (
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#c084fc,0_0_20px_#38bdf8] animate-ping pointer-events-none" />
          )}

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl overflow-visible"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
          >
            <rect
              x="1"
              y="1"
              width="198"
              height="198"
              rx="16"
              fill="none"
              stroke="#c084fc"
              strokeWidth="2.5"
              strokeDasharray="800"
              strokeDashoffset="0"
              className="filter drop-shadow-[0_0_8px_#c084fc] drop-shadow-[0_0_14px_#38bdf8] transition-all duration-1000 ease-out"
            />
          </svg>
        </>
      )}

      {/* 2. BACKGROUND GLASS FILL & SUBTLE PER-STAGE FLOURISHES */}
      {(!isHidden && !isBlinking) && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-surface/90 via-surface/80 to-surface/95 backdrop-blur-md pointer-events-none -z-10 overflow-hidden">
          {/* Subtle cosmic grid */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:20px_20px]" />

          {/* STAGE-SPECIFIC FLOURISHES */}
          {/* Stage 1: Radar Ripple */}
          {stage.step === 1 && (isTyping || isCompleted) && (
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full border border-primary/20 pointer-events-none animate-ping opacity-30" />
          )}

          {/* Stage 2: Blueprint Architecture Grid */}
          {stage.step === 2 && (isTyping || isCompleted) && (
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
          )}

          {/* Stage 3: Tiny Floating Code Glyphs */}
          {stage.step === 3 && (isTyping || isCompleted) && (
            <div className="absolute bottom-2 right-2 flex flex-col items-end gap-1 text-[9px] font-mono text-primary/30 pointer-events-none select-none">
              <span className="animate-particle-float opacity-40">{`{ ... }`}</span>
              <span className="animate-pulse opacity-50">{`async () =>`}</span>
              <span className="opacity-30">{`return true;`}</span>
            </div>
          )}

          {/* Stage 4: Scanning Laser Beam Sweeps Down */}
          {stage.step === 4 && isTyping && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent filter blur-[1px] animate-laser-scan pointer-events-none z-10" />
          )}

          {/* Stage 5: Rocket Exhaust Glow & Spark Burst */}
          {stage.step === 5 && (isTyping || isCompleted || isFinaleWave) && (
            <div className="absolute -inset-1 rounded-2xl border border-accent/40 animate-pulse pointer-events-none -z-10 shadow-[0_0_30px_rgba(147,51,234,0.5)]" />
          )}
        </div>
      )}

      {/* 3. CARD CONTENT WITH CHARACTER-BY-CHARACTER TYPEWRITER (aria-hidden for clean screen readers) */}
      <div aria-hidden="true">
        {/* Top Header Row: Typed Number "0X" & Scaled Icon */}
        <div className="flex items-center justify-between mb-3 min-h-[28px]">
          {/* Number 0X */}
          <div className="min-w-[36px]">
            {typedNumber && (
              <span
                className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                  isCurrentFocus
                    ? 'bg-primary text-white shadow-[0_0_12px_#9333ea]'
                    : isFinaleWave
                    ? 'bg-accent text-white shadow-[0_0_14px_#c084fc]'
                    : isCompleted
                    ? 'bg-primary/20 text-accent border border-primary/30'
                    : 'bg-bg-subtle text-text-subtle'
                }`}
              >
                {typedNumber}
                {activeCaretAt === 'number' && (
                  <span className="w-1.5 h-3 bg-accent animate-pulse inline-block" />
                )}
              </span>
            )}
          </div>

          {/* Stage Icon */}
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
              showIcon
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-50'
            } ${
              isCurrentFocus
                ? 'bg-primary text-white scale-110 shadow-[0_0_12px_#9333ea]'
                : isFinaleWave
                ? 'bg-accent text-white scale-110 shadow-[0_0_14px_#c084fc]'
                : isCompleted
                ? 'bg-surface-hover text-accent border border-primary/20'
                : 'text-text-subtle'
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 transition-transform ${
                stage.step === 5 && isCurrentFocus ? '-translate-y-0.5 scale-110' : ''
              }`}
            />
          </div>
        </div>

        {/* Title Line with Typewriter Caret */}
        <div className="min-h-[24px]">
          {typedTitle && (
            <h3 className="font-bold text-sm text-text tracking-tight mb-1 flex items-center">
              <span>{typedTitle}</span>
              {activeCaretAt === 'title' && (
                <span className="w-1.5 h-3.5 bg-accent animate-pulse inline-block ml-0.5" />
              )}
            </h3>
          )}
        </div>

        {/* Description Lines with Typewriter Caret */}
        <div className="min-h-[54px]">
          {typedDesc && (
            <p className="text-[11px] text-text-muted leading-relaxed line-clamp-3">
              <span>{typedDesc}</span>
              {activeCaretAt === 'desc' && (
                <span className="w-1.5 h-3 bg-accent animate-pulse inline-block ml-0.5 align-middle" />
              )}
            </p>
          )}
        </div>
      </div>

      {/* 4. FOOTER: DURATION & STAGE BADGE */}
      <div
        aria-hidden="true"
        className={`pt-2.5 border-t border-border/50 flex items-center justify-between text-[10px] font-mono transition-opacity duration-300 min-h-[26px] ${
          showFooter ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span
          className={
            isCompleted || isFinaleWave || isFinaleSettled
              ? 'text-accent font-medium'
              : 'text-text-subtle'
          }
        >
          {stage.duration}
        </span>

        {/* Stage 4 Verified Success Indicator */}
        {stage.step === 4 && isCompleted && (
          <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[9px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Verified
          </span>
        )}

        {/* Stage 5 Live Launch Badge */}
        {stage.step === 5 && isCompleted && (
          <span className="text-purple-300 font-semibold text-[9px] bg-primary/20 px-1.5 py-0.5 rounded border border-primary/30">
            Live 🚀
          </span>
        )}

        {/* Building Status Pill */}
        {isTyping && stage.step !== 4 && stage.step !== 5 && (
          <span className="text-accent flex items-center gap-1 text-[9px]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            Typing...
          </span>
        )}
      </div>
    </div>
  );
};
