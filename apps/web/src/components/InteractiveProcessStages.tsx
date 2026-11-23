'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { ProcessStage } from '@ps/content';
import {
  Compass,
  FileCode,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Terminal,
  Activity,
  Layers,
} from 'lucide-react';

interface Props {
  stages: ProcessStage[];
}

type AnimationPhase =
  | 'IDLE'
  | 'STAGE_1_CONSTRUCT'
  | 'WIRE_1_DRAW'
  | 'STAGE_2_CONSTRUCT'
  | 'WIRE_2_DRAW'
  | 'STAGE_3_CONSTRUCT'
  | 'WIRE_3_DRAW'
  | 'STAGE_4_CONSTRUCT'
  | 'WIRE_4_DRAW'
  | 'STAGE_5_CONSTRUCT'
  | 'ALL_COMPLETED';

export const InteractiveProcessStages: React.FC<Props> = ({ stages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation State
  const [phase, setPhase] = useState<AnimationPhase>('IDLE');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [hasTriggered, setHasTriggered] = useState<boolean>(false);
  const [activeInfoStep, setActiveInfoStep] = useState<number>(1);
  const [manuallySelected, setManuallySelected] = useState<boolean>(false);
  const [wireProgress, setWireProgress] = useState<number>(0);
  const [cardProgress, setCardProgress] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Timeouts ref to ensure clean cancellation
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Detect reduced motion & intersection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setIsReducedMotion(true);
        setPhase('ALL_COMPLETED');
        setActiveInfoStep(1);
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          setPhase('STAGE_1_CONSTRUCT');
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasTriggered]);

  // Determine which stages are completed / currently constructing / visible
  const getStageState = (step: number) => {
    if (isReducedMotion || phase === 'ALL_COMPLETED') {
      return { isConstructed: true, isConstructing: false, isWaiting: false };
    }

    switch (phase) {
      case 'IDLE':
        return { isConstructed: false, isConstructing: false, isWaiting: true };

      case 'STAGE_1_CONSTRUCT':
        if (step === 1) return { isConstructed: false, isConstructing: true, isWaiting: false };
        return { isConstructed: false, isConstructing: false, isWaiting: true };

      case 'WIRE_1_DRAW':
        if (step === 1) return { isConstructed: true, isConstructing: false, isWaiting: false };
        return { isConstructed: false, isConstructing: false, isWaiting: true };

      case 'STAGE_2_CONSTRUCT':
        if (step === 1) return { isConstructed: true, isConstructing: false, isWaiting: false };
        if (step === 2) return { isConstructed: false, isConstructing: true, isWaiting: false };
        return { isConstructed: false, isConstructing: false, isWaiting: true };

      case 'WIRE_2_DRAW':
        if (step <= 2) return { isConstructed: true, isConstructing: false, isWaiting: false };
        return { isConstructed: false, isConstructing: false, isWaiting: true };

      case 'STAGE_3_CONSTRUCT':
        if (step <= 2) return { isConstructed: true, isConstructing: false, isWaiting: false };
        if (step === 3) return { isConstructed: false, isConstructing: true, isWaiting: false };
        return { isConstructed: false, isConstructing: false, isWaiting: true };

      case 'WIRE_3_DRAW':
        if (step <= 3) return { isConstructed: true, isConstructing: false, isWaiting: false };
        return { isConstructed: false, isConstructing: false, isWaiting: true };

      case 'STAGE_4_CONSTRUCT':
        if (step <= 3) return { isConstructed: true, isConstructing: false, isWaiting: false };
        if (step === 4) return { isConstructed: false, isConstructing: true, isWaiting: false };
        return { isConstructed: false, isConstructing: false, isWaiting: true };

      case 'WIRE_4_DRAW':
        if (step <= 4) return { isConstructed: true, isConstructing: false, isWaiting: false };
        return { isConstructed: false, isConstructing: false, isWaiting: true };

      case 'STAGE_5_CONSTRUCT':
        if (step <= 4) return { isConstructed: true, isConstructing: false, isWaiting: false };
        if (step === 5) return { isConstructed: false, isConstructing: true, isWaiting: false };
        return { isConstructed: false, isConstructing: false, isWaiting: true };

      default:
        return { isConstructed: true, isConstructing: false, isWaiting: false };
    }
  };

  // Determine wire illumination and drawing state
  const getWireState = (wireIndex: number) => {
    // wireIndex: 1 for between 1 & 2, 2 for 2 & 3, etc.
    if (isReducedMotion || phase === 'ALL_COMPLETED') {
      return { isIlluminated: true, isDrawing: false, progress: 100 };
    }

    if (wireIndex === 1) {
      if (phase === 'WIRE_1_DRAW') return { isIlluminated: false, isDrawing: true, progress: wireProgress };
      if (
        phase === 'STAGE_2_CONSTRUCT' ||
        phase === 'WIRE_2_DRAW' ||
        phase === 'STAGE_3_CONSTRUCT' ||
        phase === 'WIRE_3_DRAW' ||
        phase === 'STAGE_4_CONSTRUCT' ||
        phase === 'WIRE_4_DRAW' ||
        phase === 'STAGE_5_CONSTRUCT'
      ) {
        return { isIlluminated: true, isDrawing: false, progress: 100 };
      }
      return { isIlluminated: false, isDrawing: false, progress: 0 };
    }

    if (wireIndex === 2) {
      if (phase === 'WIRE_2_DRAW') return { isIlluminated: false, isDrawing: true, progress: wireProgress };
      if (
        phase === 'STAGE_3_CONSTRUCT' ||
        phase === 'WIRE_3_DRAW' ||
        phase === 'STAGE_4_CONSTRUCT' ||
        phase === 'WIRE_4_DRAW' ||
        phase === 'STAGE_5_CONSTRUCT'
      ) {
        return { isIlluminated: true, isDrawing: false, progress: 100 };
      }
      return { isIlluminated: false, isDrawing: false, progress: 0 };
    }

    if (wireIndex === 3) {
      if (phase === 'WIRE_3_DRAW') return { isIlluminated: false, isDrawing: true, progress: wireProgress };
      if (
        phase === 'STAGE_4_CONSTRUCT' ||
        phase === 'WIRE_4_DRAW' ||
        phase === 'STAGE_5_CONSTRUCT'
      ) {
        return { isIlluminated: true, isDrawing: false, progress: 100 };
      }
      return { isIlluminated: false, isDrawing: false, progress: 0 };
    }

    if (wireIndex === 4) {
      if (phase === 'WIRE_4_DRAW') return { isIlluminated: false, isDrawing: true, progress: wireProgress };
      if (phase === 'STAGE_5_CONSTRUCT') {
        return { isIlluminated: true, isDrawing: false, progress: 100 };
      }
      return { isIlluminated: false, isDrawing: false, progress: 0 };
    }

    return { isIlluminated: false, isDrawing: false, progress: 0 };
  };

  // State machine progression handler
  useEffect(() => {
    if (isPaused || phase === 'IDLE' || phase === 'ALL_COMPLETED') return;

    let duration = 2200;
    let nextPhase: AnimationPhase = 'ALL_COMPLETED';
    let targetStep = activeInfoStep;

    // Smooth progress interpolation for card or wire
    const startTime = performance.now();
    const isWire = phase.includes('WIRE');

    if (phase === 'STAGE_1_CONSTRUCT') {
      duration = 2400;
      nextPhase = 'WIRE_1_DRAW';
      targetStep = 1;
    } else if (phase === 'WIRE_1_DRAW') {
      duration = 1300;
      nextPhase = 'STAGE_2_CONSTRUCT';
    } else if (phase === 'STAGE_2_CONSTRUCT') {
      duration = 2400;
      nextPhase = 'WIRE_2_DRAW';
      targetStep = 2;
    } else if (phase === 'WIRE_2_DRAW') {
      duration = 1300;
      nextPhase = 'STAGE_3_CONSTRUCT';
    } else if (phase === 'STAGE_3_CONSTRUCT') {
      duration = 2400;
      nextPhase = 'WIRE_3_DRAW';
      targetStep = 3;
    } else if (phase === 'WIRE_3_DRAW') {
      duration = 1300;
      nextPhase = 'STAGE_4_CONSTRUCT';
    } else if (phase === 'STAGE_4_CONSTRUCT') {
      duration = 2400;
      nextPhase = 'WIRE_4_DRAW';
      targetStep = 4;
    } else if (phase === 'WIRE_4_DRAW') {
      duration = 1300;
      nextPhase = 'STAGE_5_CONSTRUCT';
    } else if (phase === 'STAGE_5_CONSTRUCT') {
      duration = 2600;
      nextPhase = 'ALL_COMPLETED';
      targetStep = 5;
    }

    // Automatically sync the info panel if user hasn't explicitly clicked away
    if (!manuallySelected && targetStep !== activeInfoStep) {
      setActiveInfoStep(targetStep);
    }

    const animateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));

      if (isWire) {
        setWireProgress(pct);
      } else {
        setCardProgress(pct);
      }

      if (elapsed < duration) {
        animFrameRef.current = requestAnimationFrame(animateProgress);
      }
    };

    animFrameRef.current = requestAnimationFrame(animateProgress);

    timerRef.current = setTimeout(() => {
      setWireProgress(0);
      setCardProgress(0);
      setPhase(nextPhase);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [phase, isPaused, manuallySelected]);

  // Handle All Completed Hold & Loop
  useEffect(() => {
    if (phase === 'ALL_COMPLETED' && !isPaused && !isReducedMotion) {
      // Hold illuminated completed state for 8 seconds, then smooth loop
      const holdTimer = setTimeout(() => {
        // Can optionally loop or keep illuminated. Keeping it illuminated with manual replay is best UX.
      }, 8000);

      return () => clearTimeout(holdTimer);
    }
  }, [phase, isPaused, isReducedMotion]);

  // User Actions
  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleReplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsPaused(false);
    setManuallySelected(false);
    setWireProgress(0);
    setCardProgress(0);
    setPhase('STAGE_1_CONSTRUCT');
    setActiveInfoStep(1);
  };

  const handleSkipToEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsPaused(false);
    setPhase('ALL_COMPLETED');
    setWireProgress(100);
    setCardProgress(100);
  };

  const handleSelectStage = (step: number) => {
    setManuallySelected(true);
    setActiveInfoStep(step);
  };

  const activeStage = stages.find((s) => s.step === activeInfoStep) || stages[0]!;

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

  return (
    <div ref={containerRef} className="space-y-8 sm:space-y-12">
      {/* 1. Header Control Bar (Pause, Resume, Replay, View All & Progress Pill) */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl bg-surface/70 border border-border/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                phase === 'ALL_COMPLETED'
                  ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                  : isPaused
                  ? 'bg-amber-400'
                  : 'bg-primary shadow-[0_0_10px_#9333ea] animate-pulse'
              }`}
            />
          </div>
          <span className="text-xs font-mono font-medium text-text">
            {phase === 'ALL_COMPLETED'
              ? 'Complete Journey Illuminated'
              : isPaused
              ? 'Animation Paused'
              : phase.startsWith('STAGE')
              ? `Constructing Stage 0${phase.replace(/\D/g, '')} of 05`
              : phase.startsWith('WIRE')
              ? `Extending Pathway Conduit 0${phase.replace(/\D/g, '')}`
              : 'Awaiting Viewport Entry'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={handleTogglePause}
            aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border hover:border-primary/50 text-text font-medium transition-colors"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-accent" /> : <Pause className="w-3.5 h-3.5 text-accent" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            type="button"
            onClick={handleReplay}
            aria-label="Replay process journey"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border hover:border-primary/50 text-text font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-accent" />
            <span>Replay</span>
          </button>

          <button
            type="button"
            onClick={handleSkipToEnd}
            aria-label="View entire journey"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 text-accent font-medium transition-colors"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Complete</span>
            <span className="sm:hidden">All</span>
          </button>
        </div>
      </div>

      {/* 2. AUTOMATED PROJECT JOURNEY (DESKTOP HORIZONTAL CONSTRUCT) */}
      <div className="hidden lg:flex items-center justify-between gap-1 xl:gap-2 relative py-4">
        {stages.map((stage, idx) => {
          const { isConstructed, isConstructing, isWaiting } = getStageState(stage.step);
          const wireState = idx < 4 ? getWireState(idx + 1) : null;
          const Icon = getStageIcon(stage.step);
          const isSelected = stage.step === activeInfoStep;

          return (
            <React.Fragment key={stage.id}>
              {/* Individual Stage Card */}
              <div
                onClick={() => handleSelectStage(stage.step)}
                className={`relative flex-1 min-w-[190px] xl:min-w-[210px] p-4 xl:p-5 rounded-2xl cursor-pointer transition-all duration-500 select-none ${
                  isWaiting
                    ? 'opacity-20 border border-dashed border-border/40 bg-surface/10'
                    : isConstructing
                    ? 'opacity-100 bg-surface/95 border border-primary shadow-[0_0_25px_rgba(147,51,234,0.35)] scale-[1.02]'
                    : isConstructed
                    ? isSelected
                      ? 'opacity-100 bg-surface/90 border border-accent ring-1 ring-accent/60 shadow-[0_0_20px_rgba(192,132,252,0.25)]'
                      : phase === 'ALL_COMPLETED'
                      ? 'opacity-100 bg-surface/85 border border-primary/60 shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:border-accent'
                      : 'opacity-90 bg-surface/75 border border-border/80 hover:border-primary/40'
                    : 'opacity-30'
                }`}
              >
                {/* SVG Outline Progressive Drawing Effect during Construction */}
                {isConstructing && (
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
                      strokeWidth="2"
                      strokeDasharray="800"
                      strokeDashoffset={800 - 8 * cardProgress}
                      className="filter drop-shadow-[0_0_8px_#c084fc]"
                    />
                  </svg>
                )}

                {/* Special Stage Specific Effects */}
                {/* Stage 3 (Development): Code/Circuit Glyphs */}
                {stage.step === 3 && (isConstructing || isConstructed) && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-mono text-primary/40 pointer-events-none">
                    <span className="animate-pulse">{`{ }`}</span>
                    <span>{`</>`}</span>
                  </div>
                )}

                {/* Stage 4 (Testing): Scanning Laser Beam */}
                {stage.step === 4 && isConstructing && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent filter blur-[1px] animate-laser-scan pointer-events-none z-10" />
                )}

                {/* Stage 5 (Launch): Spark Burst when finished */}
                {stage.step === 5 && phase === 'ALL_COMPLETED' && (
                  <div className="absolute -inset-1 rounded-2xl border border-accent/40 animate-pulse pointer-events-none -z-10 shadow-[0_0_30px_rgba(147,51,234,0.4)]" />
                )}

                {/* Top Row: Number Badge & Icon */}
                <div className="flex items-center justify-between mb-3.5">
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full transition-colors ${
                      isConstructing
                        ? 'bg-primary text-white shadow-[0_0_10px_#9333ea]'
                        : isConstructed
                        ? 'bg-primary/20 text-accent border border-primary/30'
                        : 'bg-bg-subtle text-text-subtle'
                    }`}
                  >
                    0{stage.step}
                  </span>

                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      isConstructing
                        ? 'bg-primary text-white scale-110 shadow-[0_0_12px_#9333ea]'
                        : isConstructed
                        ? 'bg-surface-hover text-accent border border-primary/20'
                        : 'text-text-subtle'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-sm text-text mb-1 tracking-tight">
                  {stage.step === 3
                    ? 'Development'
                    : stage.step === 4
                    ? 'Testing'
                    : stage.step === 5
                    ? 'Launch'
                    : stage.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">
                  {stage.summary}
                </p>

                {/* Duration indicator */}
                <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-[10px] font-mono">
                  <span className={isConstructed ? 'text-accent font-medium' : 'text-text-subtle'}>
                    {stage.duration}
                  </span>
                  {stage.step === 4 && isConstructed && (
                    <span className="text-emerald-400 font-semibold flex items-center gap-0.5 text-[9px]">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                  {stage.step === 5 && isConstructed && (
                    <span className="text-purple-300 font-semibold text-[9px]">Live 🚀</span>
                  )}
                </div>
              </div>

              {/* Connecting Wire Component Between Stages (Desktop Horizontal) */}
              {wireState && (
                <div className="flex-1 min-w-[28px] max-w-[56px] h-8 flex items-center justify-center relative">
                  <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
                    {/* Background Conduit Track */}
                    <line x1="0" y1="12" x2="100" y2="12" stroke="#1b2038" strokeWidth="2" strokeDasharray="3 3" />

                    {/* Illuminated Active Line */}
                    <line
                      x1="0"
                      y1="12"
                      x2="100"
                      y2="12"
                      stroke="#c084fc"
                      strokeWidth={wireState.isIlluminated ? '2.5' : '2'}
                      strokeDasharray="100"
                      strokeDashoffset={100 - wireState.progress}
                      className={
                        wireState.isIlluminated
                          ? 'transition-all duration-300 filter drop-shadow-[0_0_6px_#c084fc] drop-shadow-[0_0_12px_#38bdf8]'
                          : ''
                      }
                    />

                    {/* Travelling Light Particle */}
                    {wireState.isDrawing && (
                      <circle
                        cx={wireState.progress}
                        cy="12"
                        r="3.5"
                        fill="#ffffff"
                        className="filter drop-shadow-[0_0_6px_#c084fc] drop-shadow-[0_0_12px_#38bdf8]"
                      />
                    )}

                    {/* Origin Beacon */}
                    <circle cx="0" cy="12" r="2.5" fill={wireState.isIlluminated || wireState.isDrawing ? '#c084fc' : '#2e3650'} />

                    {/* Destination Beacon */}
                    <circle
                      cx="100"
                      cy="12"
                      r="2.5"
                      fill={wireState.isIlluminated ? '#c084fc' : wireState.isDrawing ? '#38bdf8' : '#2e3650'}
                      className={wireState.isDrawing && wireState.progress > 85 ? 'animate-ping' : ''}
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 3. AUTOMATED PROJECT JOURNEY (MOBILE & TABLET VERTICAL PATHWAY) */}
      <div className="lg:hidden flex flex-col gap-1 relative py-2">
        {stages.map((stage, idx) => {
          const { isConstructed, isConstructing, isWaiting } = getStageState(stage.step);
          const wireState = idx < 4 ? getWireState(idx + 1) : null;
          const Icon = getStageIcon(stage.step);
          const isSelected = stage.step === activeInfoStep;

          return (
            <React.Fragment key={stage.id}>
              {/* Individual Stage Card (Mobile Vertical) */}
              <div
                onClick={() => handleSelectStage(stage.step)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 relative ${
                  isWaiting
                    ? 'opacity-25 border border-dashed border-border/40 bg-surface/10'
                    : isConstructing
                    ? 'opacity-100 bg-surface/95 border border-primary shadow-[0_0_20px_rgba(147,51,234,0.3)] ring-1 ring-primary'
                    : isConstructed
                    ? isSelected
                      ? 'opacity-100 bg-surface/90 border border-accent ring-1 ring-accent/60 shadow-[0_0_15px_rgba(192,132,252,0.2)]'
                      : phase === 'ALL_COMPLETED'
                      ? 'opacity-100 bg-surface/80 border border-primary/50'
                      : 'opacity-90 bg-surface/70 border border-border'
                    : 'opacity-30'
                }`}
              >
                {/* Stage 4 (Testing): Mobile Scanning Laser */}
                {stage.step === 4 && isConstructing && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent filter blur-[1px] animate-laser-scan pointer-events-none z-10" />
                )}

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        isConstructing
                          ? 'bg-primary text-white shadow-[0_0_8px_#9333ea]'
                          : isConstructed
                          ? 'bg-primary/20 text-accent border border-primary/30'
                          : 'bg-bg-subtle text-text-subtle'
                      }`}
                    >
                      0{stage.step}
                    </span>
                    <h3 className="font-bold text-sm text-text">
                      {stage.step === 3
                        ? 'Development'
                        : stage.step === 4
                        ? 'Testing'
                        : stage.step === 5
                        ? 'Launch'
                        : stage.title}
                    </h3>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                      isConstructing
                        ? 'bg-primary text-white'
                        : isConstructed
                        ? 'bg-surface-hover text-accent'
                        : 'text-text-subtle'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-xs text-text-muted leading-relaxed mt-2">
                  {stage.summary}
                </p>

                <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between text-[11px] font-mono">
                  <span className={isConstructed ? 'text-accent' : 'text-text-subtle'}>
                    Timeline: {stage.duration}
                  </span>
                  {stage.step === 4 && isConstructed && (
                    <span className="text-emerald-400 font-semibold text-[10px]">Verified ✓</span>
                  )}
                  {stage.step === 5 && isConstructed && (
                    <span className="text-purple-300 font-semibold text-[10px]">Live 🚀</span>
                  )}
                </div>
              </div>

              {/* Vertical Connecting Conduit Wire (Mobile) */}
              {wireState && (
                <div className="w-full h-8 flex items-center justify-center relative my-0.5">
                  <svg className="w-8 h-8 overflow-visible" viewBox="0 0 24 40" preserveAspectRatio="none">
                    {/* Conduit track */}
                    <line x1="12" y1="0" x2="12" y2="40" stroke="#1b2038" strokeWidth="2" strokeDasharray="3 3" />

                    {/* Illuminated vertical line */}
                    <line
                      x1="12"
                      y1="0"
                      x2="12"
                      y2="40"
                      stroke="#c084fc"
                      strokeWidth={wireState.isIlluminated ? '2.5' : '2'}
                      strokeDasharray="40"
                      strokeDashoffset={40 - (40 * wireState.progress) / 100}
                      className={
                        wireState.isIlluminated
                          ? 'transition-all duration-300 filter drop-shadow-[0_0_6px_#c084fc]'
                          : ''
                      }
                    />

                    {/* Travelling particle */}
                    {wireState.isDrawing && (
                      <circle
                        cx="12"
                        cy={(40 * wireState.progress) / 100}
                        r="3.5"
                        fill="#ffffff"
                        className="filter drop-shadow-[0_0_6px_#c084fc] drop-shadow-[0_0_12px_#38bdf8]"
                      />
                    )}
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 4. SYNCHRONIZED DETAILED INFORMATION PANEL */}
      <div className="rounded-2xl border border-primary/30 bg-surface/90 backdrop-blur-md p-6 sm:p-10 shadow-[0_0_25px_-5px_rgba(147,51,234,0.18)] transition-all duration-300">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between items-start">
          {/* Left Column: Stage Overview & Activities */}
          <div className="lg:max-w-2xl space-y-6 w-full">
            {/* Header with Stage Number & Duration */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 text-accent font-mono font-bold text-sm flex items-center justify-center shadow-[0_0_10px_rgba(147,51,234,0.2)]">
                  0{activeStage.step}
                </span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 border border-primary/20 text-accent">
                  <Clock className="w-3 h-3" />
                  <span>Timeline: {activeStage.duration}</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight pt-1">
                {activeStage.title}
              </h2>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {activeStage.summary}
              </p>
            </div>

            {/* Activities Performed (Section 5 Specifications) */}
            <div className="space-y-3 pt-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-text font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Activities Performed:
              </div>
              <ul className="space-y-2.5">
                {activeStage.activities.map((activity, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-muted">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Tangible Deliverables & Call To Action */}
          <div className="w-full lg:w-80 space-y-5 bg-bg-subtle/80 p-6 rounded-xl border border-border/80">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5 mb-3">
                <FileCode className="w-4 h-4" />
                Tangible Outputs:
              </div>
              <ul className="space-y-2">
                {activeStage.outputs.map((output, i) => (
                  <li
                    key={i}
                    className="p-2.5 rounded-lg bg-surface border border-border text-xs text-text font-mono leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-accent font-bold">›</span>
                    <span>{output}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Milestone Guarantee */}
            <div className="pt-3 border-t border-border space-y-1.5 text-xs text-text-muted">
              <div className="font-medium text-text flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Accountability Guarantee</span>
              </div>
              <p className="text-[11px] text-text-subtle leading-relaxed">
                Every milestone requires documented stakeholder verification before proceeding to the next sprint.
              </p>
            </div>

            {/* Stage Navigation / Project Trigger */}
            <div className="pt-2">
              {activeInfoStep < 5 ? (
                <button
                  type="button"
                  onClick={() => handleSelectStage(activeInfoStep + 1)}
                  className="w-full py-2 px-3 rounded-lg bg-surface hover:bg-surface-hover border border-border text-xs font-medium text-text flex items-center justify-between transition-colors"
                >
                  <span>Inspect Next: Stage 0{activeInfoStep + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </button>
              ) : (
                <a
                  href="/contact"
                  className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(147,51,234,0.3)]"
                >
                  <span>Ready to Begin? Start a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
