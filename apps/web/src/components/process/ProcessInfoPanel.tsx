'use client';

import React from 'react';
import { ProcessStage } from '@ps/content';
import {
  Clock,
  Sparkles,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  FastForward,
} from 'lucide-react';

interface ProcessInfoPanelProps {
  activeStage: ProcessStage;
  currentConstructingStage: number | null;
  isPaused: boolean;
  isCompleted: boolean;
  onTogglePause: () => void;
  onReplay: () => void;
  onShowAll: () => void;
  onSelectStage: (step: number) => void;
}

export const ProcessInfoPanel: React.FC<ProcessInfoPanelProps> = ({
  activeStage,
  currentConstructingStage,
  isPaused,
  isCompleted,
  onTogglePause,
  onReplay,
  onShowAll,
  onSelectStage,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Unobtrusive Control Bar & Live Status Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl bg-surface/75 border border-border/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isCompleted
                  ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                  : isPaused
                  ? 'bg-amber-400'
                  : 'bg-primary shadow-[0_0_10px_#9333ea] animate-pulse'
              }`}
            />
          </div>
          <span className="text-xs font-mono font-medium text-text">
            {isCompleted
              ? 'Complete Journey Illuminated • All 5 Stages Ready'
              : isPaused
              ? 'Automation Paused • Click Resume to Continue'
              : currentConstructingStage
              ? `Constructing Stage 0${currentConstructingStage} in Real Time`
              : 'Automated Journey Active'}
          </span>
        </div>

        {/* Action Controls (Pause, Replay, Show All) */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={onTogglePause}
            aria-label={isPaused ? 'Resume automated animation' : 'Pause automated animation'}
            className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg bg-surface border border-border hover:border-primary/50 text-text font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-accent" /> : <Pause className="w-3.5 h-3.5 text-accent" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            type="button"
            onClick={onReplay}
            aria-label="Replay process animation from beginning"
            className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg bg-surface border border-border hover:border-primary/50 text-text font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RotateCcw className="w-3.5 h-3.5 text-accent" />
            <span>Replay</span>
          </button>

          <button
            type="button"
            onClick={onShowAll}
            aria-label="Show all five completed stages immediately"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 text-accent font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Show all</span>
          </button>
        </div>
      </div>

      {/* 2. Detailed Stage Information Card with aria-live for accessibility */}
      <div
        aria-live="polite"
        className="rounded-2xl border border-primary/30 bg-surface/90 backdrop-blur-md p-6 sm:p-10 shadow-[0_0_25px_-5px_rgba(147,51,234,0.18)] transition-all duration-300"
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between items-start">
          {/* Left Column: Stage Overview & Activities */}
          <div className="lg:max-w-2xl space-y-6 w-full">
            {/* Header: Stage Number Pill & Timeline Badge */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 text-accent font-mono font-bold text-sm flex items-center justify-center shadow-[0_0_10px_rgba(147,51,234,0.2)]">
                  0{activeStage.step}
                </span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 border border-primary/20 text-accent">
                  <Clock className="w-3 h-3" />
                  <span>Estimated Timeline: {activeStage.duration}</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight pt-1">
                {activeStage.title}
              </h2>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {activeStage.summary}
              </p>
            </div>

            {/* Activities Performed (Section 9 Exact Specifications) */}
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

          {/* Right Column: Tangible Deliverables & CTA */}
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

            {/* Milestone Accountability Guarantee */}
            <div className="pt-3 border-t border-border space-y-1.5 text-xs text-text-muted">
              <div className="font-medium text-text flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Accountability Guarantee</span>
              </div>
              <p className="text-[11px] text-text-subtle leading-relaxed">
                Every milestone requires documented stakeholder verification before proceeding to the next sprint.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              {activeStage.step < 5 ? (
                <button
                  type="button"
                  onClick={() => onSelectStage(activeStage.step + 1)}
                  className="w-full py-2.5 px-3 min-h-[44px] rounded-lg bg-surface hover:bg-surface-hover border border-border text-xs font-medium text-text flex items-center justify-between transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>Inspect Next: Stage 0{activeStage.step + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </button>
              ) : (
                <a
                  href="/contact"
                  className="w-full py-2.5 px-3 min-h-[44px] rounded-lg bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(147,51,234,0.3)] focus-visible:ring-2 focus-visible:ring-primary"
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
