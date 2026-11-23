'use client';

import React, { useState } from 'react';
import { ProcessStage } from '@ps/content';
import {
  Compass,
  FileCode,
  Code2,
  CheckCircle2,
  Rocket,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  stages: ProcessStage[];
}

export const InteractiveProcessStages: React.FC<Props> = ({ stages }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const activeStage = stages.find((s) => s.step === activeStep) || stages[0]!;

  const getStageIcon = (step: number) => {
    switch (step) {
      case 1:
        return Compass;
      case 2:
        return FileCode;
      case 3:
        return Code2;
      case 4:
        return CheckCircle2;
      case 5:
        return Rocket;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* 1. Stage Selector Navigation Tabs (Desktop & Tablet Horizontal Stepper) */}
      <div className="hidden md:grid grid-cols-5 gap-3">
        {stages.map((stage) => {
          const isSelected = stage.step === activeStep;
          const Icon = getStageIcon(stage.step);

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStep(stage.step)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-surface/90 border-primary text-text shadow-[0_0_20px_rgba(147,51,234,0.18)] ring-1 ring-primary/50'
                  : 'bg-surface/60 border-border/80 text-text-muted hover:border-primary/40 hover:bg-surface/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'bg-bg-subtle text-text-subtle'
                    }`}
                  >
                    Stage 0{stage.step}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? 'text-accent' : 'text-text-subtle'
                    }`}
                  />
                </div>

                <h3 className="font-bold text-sm text-text mb-1">{stage.title}</h3>
                <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">
                  {stage.summary}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-[10px] font-mono">
                <span className={isSelected ? 'text-accent font-semibold' : 'text-text-subtle'}>
                  {stage.duration}
                </span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isSelected ? 'translate-x-0.5 text-accent' : 'opacity-40'
                  }`}
                />
              </div>

              {isSelected && (
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-2.5 bg-primary [clip-path:polygon(50%_100%,0_0,100%_0)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Vertical Navigation Accordion Selector */}
      <div className="md:hidden flex flex-col gap-2">
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle px-1 mb-1">
          Select Stage:
        </div>
        <div className="grid grid-cols-5 gap-1.5 p-1 rounded-xl bg-surface border border-border">
          {stages.map((stage) => {
            const isSelected = stage.step === activeStep;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStep(stage.step)}
                className={`py-2 px-1 rounded-lg text-center transition-all ${
                  isSelected
                    ? 'bg-primary text-white font-bold text-xs shadow-xs'
                    : 'text-text-muted hover:text-text text-[11px] font-medium'
                }`}
              >
                0{stage.step}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Expanded Stage Details Card (Revealed on Click) */}
      <div className="rounded-2xl border border-primary/30 bg-surface/90 backdrop-blur-md p-6 sm:p-10 shadow-[0_0_25px_-5px_rgba(147,51,234,0.14)] animate-in fade-in zoom-in-[0.99] duration-200">
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

            {/* Activities Performed */}
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

          {/* Right Column: Tangible Deliverables & Next Stage Trigger */}
          <div className="w-full lg:w-80 space-y-5 bg-bg-subtle/80 p-6 rounded-xl border border-border/80">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5 mb-3">
                <FileCode className="w-4 h-4" />
                Tangible Deliverables:
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

            {/* Next Stage Navigation Button */}
            <div className="pt-2">
              {activeStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => Math.min(prev + 1, 5))}
                  className="w-full py-2 px-3 rounded-lg bg-surface hover:bg-surface-hover border border-border text-xs font-medium text-text flex items-center justify-between transition-colors"
                >
                  <span>Next: Stage 0{activeStep + 1} ({stages[activeStep]?.title})</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </button>
              ) : (
                <a
                  href="/contact"
                  className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(147,51,234,0.3)]"
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
