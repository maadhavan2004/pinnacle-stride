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

export type CardBuildStep =
  | 'idle'
  | 'spark'
  | 'expand'
  | 'blink'
  | 'trace'
  | 'materialise'
  | 'number'
  | 'icon'
  | 'title'
  | 'description'
  | 'settle'
  | 'completed';

interface ProcessStageCardProps {
  stage: ProcessStage;
  buildStep: CardBuildStep;
  isCompleted: boolean;
  isCurrentFocus: boolean;
  isSelected: boolean;
  isFinaleWave: boolean;
  isFinaleSettled: boolean;
  direction?: 'horizontal' | 'vertical';
  onClick: () => void;
}

export const ProcessStageCard: React.FC<ProcessStageCardProps> = ({
  stage,
  buildStep,
  isCompleted,
  isCurrentFocus,
  isSelected,
  isFinaleWave,
  isFinaleSettled,
  direction = 'horizontal',
  onClick,
}) => {
  const isIdle = buildStep === 'idle';
  const isSpark = buildStep === 'spark';
  const isExpand = buildStep === 'expand';
  const isBlink = buildStep === 'blink';
  const isTrace = buildStep === 'trace';
  const isMaterialise = buildStep === 'materialise';
  const isNumber = buildStep === 'number';
  const isIcon = buildStep === 'icon';
  const isTitle = buildStep === 'title';
  const isDescription = buildStep === 'description';
  const isSettle = buildStep === 'settle';

  // Has content emerged?
  const hasGlass =
    !isIdle && !isSpark && !isExpand && !isBlink;
  const hasNumber =
    isCompleted || isNumber || isIcon || isTitle || isDescription || isSettle;
  const hasIcon =
    isCompleted || isIcon || isTitle || isDescription || isSettle;
  const hasTitle =
    isCompleted || isTitle || isDescription || isSettle;
  const hasDescription =
    isCompleted || isDescription || isSettle;
  const hasSettledGlow =
    isCompleted || isSettle || isFinaleWave || isFinaleSettled;

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
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Stage 0${stage.step}: ${stage.title}. Click to view details.`}
      className={`relative select-none transition-all duration-300 rounded-2xl cursor-pointer ${
        direction === 'horizontal'
          ? 'flex-1 min-w-[170px] xl:min-w-[195px] p-4 xl:p-5 h-[230px] flex flex-col justify-between'
          : 'w-full p-4 min-h-[140px] flex flex-col justify-between'
      } ${
        isIdle
          ? 'opacity-0 pointer-events-none'
          : isSpark
          ? 'opacity-100 bg-transparent'
          : isExpand
          ? 'opacity-30 border border-dashed border-primary/30 bg-surface/5'
          : isBlink
          ? 'opacity-70 border border-primary/50 animate-pulse bg-surface/20'
          : isCurrentFocus
          ? 'opacity-100 bg-surface/95 border border-primary shadow-[0_0_25px_rgba(147,51,234,0.35)] scale-[1.02]'
          : isFinaleWave
          ? 'opacity-100 bg-surface/95 border border-accent ring-2 ring-accent/80 shadow-[0_0_35px_rgba(192,132,252,0.6)] scale-[1.03]'
          : isSelected
          ? 'opacity-100 bg-surface/90 border border-accent ring-1 ring-accent/60 shadow-[0_0_20px_rgba(192,132,252,0.3)]'
          : isFinaleSettled
          ? 'opacity-100 bg-surface/85 border border-primary/60 shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:border-accent'
          : isCompleted
          ? 'opacity-85 bg-surface/75 border border-border/80 hover:border-primary/40'
          : 'opacity-40'
      }`}
    >
      {/* 1. SPARK PHASE: Tiny bright glowing particle at anchor point */}
      {isSpark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <span className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_14px_#c084fc,0_0_26px_#38bdf8] block animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#c084fc] absolute inset-0 m-auto" />
          </div>
        </div>
      )}

      {/* 2. EXPAND / GHOST FRAME PHASE */}
      {isExpand && (
        <div className="absolute inset-0 rounded-2xl border border-primary/40 opacity-20 pointer-events-none" />
      )}

      {/* 3. TRACE PHASE: Progressive neon SVG border drawing clockwise with glowing head */}
      {(isTrace || isMaterialise) && (
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
            strokeDashoffset={isMaterialise ? '0' : '280'}
            className="filter drop-shadow-[0_0_8px_#c084fc] drop-shadow-[0_0_14px_#38bdf8] transition-all duration-700"
          />
        </svg>
      )}

      {/* 4. MATERIALISE: Glass fill & faint background grid/circuit texture */}
      {hasGlass && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-surface/90 via-surface/80 to-surface/95 backdrop-blur-md pointer-events-none -z-10 overflow-hidden">
          {/* Subtle cosmic grid lines */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:20px_20px]" />

          {/* STAGE-SPECIFIC BACKGROUND FLOURISHES */}
          {/* Stage 1: Radar Ripple */}
          {stage.step === 1 && (isCurrentFocus || isCompleted) && (
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full border border-primary/20 pointer-events-none animate-ping opacity-30" />
          )}

          {/* Stage 2: Blueprint Architecture Grid */}
          {stage.step === 2 && (isCurrentFocus || isCompleted) && (
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
          )}

          {/* Stage 3: Floating Code Glyphs */}
          {stage.step === 3 && (isCurrentFocus || isCompleted) && (
            <div className="absolute bottom-2 right-2 flex flex-col items-end gap-1 text-[9px] font-mono text-primary/30 pointer-events-none select-none">
              <span className="animate-particle-float opacity-40">{`{ ... }`}</span>
              <span className="animate-pulse opacity-50">{`async () =>`}</span>
              <span className="opacity-30">{`return true;`}</span>
            </div>
          )}

          {/* Stage 4: Scanning Laser Beam */}
          {stage.step === 4 && isCurrentFocus && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent filter blur-[1px] animate-laser-scan pointer-events-none z-10" />
          )}

          {/* Stage 5: Rocket Spark Burst & Exhaust Glow */}
          {stage.step === 5 && (isCurrentFocus || isFinaleWave) && (
            <div className="absolute -inset-1 rounded-2xl border border-accent/40 animate-pulse pointer-events-none -z-10 shadow-[0_0_30px_rgba(147,51,234,0.5)]" />
          )}
        </div>
      )}

      {/* 5. CONTENT AREA */}
      <div>
        {/* Top Bar: Number Badge & Icon */}
        <div className="flex items-center justify-between mb-3">
          {/* Glowing "0X" Number */}
          <div
            className={`transition-all duration-300 ${
              hasNumber
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-75'
            }`}
          >
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
              0{stage.step}
            </span>
          </div>

          {/* Animated Stage Icon */}
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
              hasIcon
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

        {/* Title with reveal */}
        <div
          className={`transition-all duration-300 ${
            hasTitle
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
          }`}
        >
          <h3 className="font-bold text-sm text-text tracking-tight mb-1">
            {stage.title}
          </h3>
        </div>

        {/* Description */}
        <div
          className={`transition-all duration-300 ${
            hasDescription
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
          }`}
        >
          <p className="text-[11px] text-text-muted leading-relaxed line-clamp-3">
            {stage.summary}
          </p>
        </div>
      </div>

      {/* Bottom Footer: Duration & Stage Status Badge */}
      <div
        className={`pt-2.5 border-t border-border/50 flex items-center justify-between text-[10px] font-mono transition-all duration-300 ${
          hasDescription
            ? 'opacity-100'
            : 'opacity-0'
        }`}
      >
        <span
          className={
            hasSettledGlow
              ? 'text-accent font-medium'
              : 'text-text-subtle'
          }
        >
          {stage.duration}
        </span>

        {/* Stage 4 Verified Success Indicator (Cyan / Emerald) */}
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

        {/* Current Focus Active Indicator */}
        {isCurrentFocus && stage.step !== 4 && stage.step !== 5 && (
          <span className="text-accent flex items-center gap-1 text-[9px]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            Building
          </span>
        )}
      </div>

      {/* Settle Glow Wave */}
      {isSettle && (
        <div className="absolute inset-0 rounded-2xl border-2 border-accent animate-ping pointer-events-none opacity-40" />
      )}
    </div>
  );
};
