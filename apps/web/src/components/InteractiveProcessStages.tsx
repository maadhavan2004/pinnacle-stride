'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ProcessStage } from '@ps/content';
import { ProcessStageCard, CardBuildStep } from './process/ProcessStageCard';
import { ProcessConnectingWire, WireBuildStep } from './process/ProcessConnectingWire';
import { ProcessInfoPanel } from './process/ProcessInfoPanel';

interface Props {
  stages: ProcessStage[];
}

type TimelinePhase =
  | 'untriggered'
  | 'lead_in'
  // Stage 1
  | 'c1_spark'
  | 'c1_expand'
  | 'c1_blink'
  | 'c1_trace'
  | 'c1_materialise'
  | 'c1_number'
  | 'c1_icon'
  | 'c1_title'
  | 'c1_description'
  | 'c1_settle'
  | 'c1_done'
  // Wire 1
  | 'w1_emit'
  | 'w1_draw'
  | 'w1_arrive'
  | 'w1_done'
  // Stage 2
  | 'c2_spark'
  | 'c2_expand'
  | 'c2_blink'
  | 'c2_trace'
  | 'c2_materialise'
  | 'c2_number'
  | 'c2_icon'
  | 'c2_title'
  | 'c2_description'
  | 'c2_settle'
  | 'c2_done'
  // Wire 2
  | 'w2_emit'
  | 'w2_draw'
  | 'w2_arrive'
  | 'w2_done'
  // Stage 3
  | 'c3_spark'
  | 'c3_expand'
  | 'c3_blink'
  | 'c3_trace'
  | 'c3_materialise'
  | 'c3_number'
  | 'c3_icon'
  | 'c3_title'
  | 'c3_description'
  | 'c3_settle'
  | 'c3_done'
  // Wire 3
  | 'w3_emit'
  | 'w3_draw'
  | 'w3_arrive'
  | 'w3_done'
  // Stage 4
  | 'c4_spark'
  | 'c4_expand'
  | 'c4_blink'
  | 'c4_trace'
  | 'c4_materialise'
  | 'c4_number'
  | 'c4_icon'
  | 'c4_title'
  | 'c4_description'
  | 'c4_settle'
  | 'c4_done'
  // Wire 4
  | 'w4_emit'
  | 'w4_draw'
  | 'w4_arrive'
  | 'w4_done'
  // Stage 5
  | 'c5_spark'
  | 'c5_expand'
  | 'c5_blink'
  | 'c5_trace'
  | 'c5_materialise'
  | 'c5_number'
  | 'c5_icon'
  | 'c5_title'
  | 'c5_description'
  | 'c5_settle'
  | 'c5_done'
  // Finale
  | 'finale_wave'
  | 'finale_settle';

export const InteractiveProcessStages: React.FC<Props> = ({ stages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Core state
  const [timelinePhase, setTimelinePhase] = useState<TimelinePhase>('untriggered');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeInfoStep, setActiveInfoStep] = useState<number>(1);
  const [userInspecting, setUserInspecting] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [wireProgress, setWireProgress] = useState<number>(0);

  // Refs for timer and animation frame cleanup
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);
  isPausedRef.current = isPaused;

  // 1. Reduced Motion Detection & Intersection Observer (40% visible)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setIsReducedMotion(true);
        setTimelinePhase('finale_settle');
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting && timelinePhase === 'untriggered') {
          setTimelinePhase('lead_in');
        }
      },
      { threshold: 0.35 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Visibility change handler (pause when tab hidden)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [timelinePhase]);

  // 2. Timeline Step Definition Table
  const timelineTransitions: Record<
    TimelinePhase,
    { next: TimelinePhase; duration: number; autoInfoStep?: number; isWire?: boolean }
  > = {
    untriggered: { next: 'untriggered', duration: 0 },
    lead_in: { next: 'c1_spark', duration: 600, autoInfoStep: 1 },

    // Stage 1 (Discovery)
    c1_spark: { next: 'c1_expand', duration: 250 },
    c1_expand: { next: 'c1_blink', duration: 300 },
    c1_blink: { next: 'c1_trace', duration: 350 },
    c1_trace: { next: 'c1_materialise', duration: 550 },
    c1_materialise: { next: 'c1_number', duration: 250 },
    c1_number: { next: 'c1_icon', duration: 250 },
    c1_icon: { next: 'c1_title', duration: 250 },
    c1_title: { next: 'c1_description', duration: 250 },
    c1_description: { next: 'c1_settle', duration: 350 },
    c1_settle: { next: 'c1_done', duration: 250 },
    c1_done: { next: 'w1_emit', duration: 300 },

    // Wire 1
    w1_emit: { next: 'w1_draw', duration: 200, isWire: true },
    w1_draw: { next: 'w1_arrive', duration: 800, isWire: true },
    w1_arrive: { next: 'w1_done', duration: 200, isWire: true },
    w1_done: { next: 'c2_spark', duration: 250, autoInfoStep: 2 },

    // Stage 2 (Planning)
    c2_spark: { next: 'c2_expand', duration: 250 },
    c2_expand: { next: 'c2_blink', duration: 300 },
    c2_blink: { next: 'c2_trace', duration: 350 },
    c2_trace: { next: 'c2_materialise', duration: 550 },
    c2_materialise: { next: 'c2_number', duration: 250 },
    c2_number: { next: 'c2_icon', duration: 250 },
    c2_icon: { next: 'c2_title', duration: 250 },
    c2_title: { next: 'c2_description', duration: 250 },
    c2_description: { next: 'c2_settle', duration: 350 },
    c2_settle: { next: 'c2_done', duration: 250 },
    c2_done: { next: 'w2_emit', duration: 300 },

    // Wire 2
    w2_emit: { next: 'w2_draw', duration: 200, isWire: true },
    w2_draw: { next: 'w2_arrive', duration: 800, isWire: true },
    w2_arrive: { next: 'w2_done', duration: 200, isWire: true },
    w2_done: { next: 'c3_spark', duration: 250, autoInfoStep: 3 },

    // Stage 3 (Development)
    c3_spark: { next: 'c3_expand', duration: 250 },
    c3_expand: { next: 'c3_blink', duration: 300 },
    c3_blink: { next: 'c3_trace', duration: 350 },
    c3_trace: { next: 'c3_materialise', duration: 550 },
    c3_materialise: { next: 'c3_number', duration: 250 },
    c3_number: { next: 'c3_icon', duration: 250 },
    c3_icon: { next: 'c3_title', duration: 250 },
    c3_title: { next: 'c3_description', duration: 250 },
    c3_description: { next: 'c3_settle', duration: 350 },
    c3_settle: { next: 'c3_done', duration: 250 },
    c3_done: { next: 'w3_emit', duration: 300 },

    // Wire 3
    w3_emit: { next: 'w3_draw', duration: 200, isWire: true },
    w3_draw: { next: 'w3_arrive', duration: 800, isWire: true },
    w3_arrive: { next: 'w3_done', duration: 200, isWire: true },
    w3_done: { next: 'c4_spark', duration: 250, autoInfoStep: 4 },

    // Stage 4 (Testing)
    c4_spark: { next: 'c4_expand', duration: 250 },
    c4_expand: { next: 'c4_blink', duration: 300 },
    c4_blink: { next: 'c4_trace', duration: 350 },
    c4_trace: { next: 'c4_materialise', duration: 550 },
    c4_materialise: { next: 'c4_number', duration: 250 },
    c4_number: { next: 'c4_icon', duration: 250 },
    c4_icon: { next: 'c4_title', duration: 250 },
    c4_title: { next: 'c4_description', duration: 250 },
    c4_description: { next: 'c4_settle', duration: 350 },
    c4_settle: { next: 'c4_done', duration: 250 },
    c4_done: { next: 'w4_emit', duration: 300 },

    // Wire 4
    w4_emit: { next: 'w4_draw', duration: 200, isWire: true },
    w4_draw: { next: 'w4_arrive', duration: 800, isWire: true },
    w4_arrive: { next: 'w4_done', duration: 200, isWire: true },
    w4_done: { next: 'c5_spark', duration: 250, autoInfoStep: 5 },

    // Stage 5 (Launch)
    c5_spark: { next: 'c5_expand', duration: 250 },
    c5_expand: { next: 'c5_blink', duration: 300 },
    c5_blink: { next: 'c5_trace', duration: 350 },
    c5_trace: { next: 'c5_materialise', duration: 600 },
    c5_materialise: { next: 'c5_number', duration: 250 },
    c5_number: { next: 'c5_icon', duration: 250 },
    c5_icon: { next: 'c5_title', duration: 250 },
    c5_title: { next: 'c5_description', duration: 250 },
    c5_description: { next: 'c5_settle', duration: 400 },
    c5_settle: { next: 'c5_done', duration: 300 },
    c5_done: { next: 'finale_wave', duration: 300 },

    // Finale
    finale_wave: { next: 'finale_settle', duration: 1500 },
    finale_settle: { next: 'finale_settle', duration: 0 },
  };

  // 3. Central Sequencer
  useEffect(() => {
    if (isPaused || timelinePhase === 'untriggered' || timelinePhase === 'finale_settle') {
      return;
    }

    const stepInfo = timelineTransitions[timelinePhase];
    if (!stepInfo || stepInfo.duration === 0) return;

    // Automatically update info panel if user hasn't explicitly clicked away to inspect
    if (stepInfo.autoInfoStep && !userInspecting) {
      setActiveInfoStep(stepInfo.autoInfoStep);
    }

    // Smooth progress interpolation for wire travelling particle
    if (timelinePhase.includes('_draw')) {
      const startTime = performance.now();
      const duration = stepInfo.duration;

      const animateWire = (now: number) => {
        const elapsed = now - startTime;
        const pct = Math.min(100, Math.round((elapsed / duration) * 100));
        setWireProgress(pct);

        if (elapsed < duration) {
          animFrameRef.current = requestAnimationFrame(animateWire);
        }
      };

      animFrameRef.current = requestAnimationFrame(animateWire);
    }

    // Schedule next transition
    timerRef.current = setTimeout(() => {
      setWireProgress(0);
      setTimelinePhase(stepInfo.next);
    }, stepInfo.duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [timelinePhase, isPaused, userInspecting]);

  // 4. Auto-Replay After Completed State (holds for 8s)
  useEffect(() => {
    if (timelinePhase === 'finale_settle' && !isPaused && !userInspecting && !isReducedMotion) {
      const replayTimer = setTimeout(() => {
        // Smooth loop back to stage 1 after 8 seconds of calm illuminated hold
        setWireProgress(0);
        setTimelinePhase('c1_spark');
        setActiveInfoStep(1);
      }, 8000);

      return () => clearTimeout(replayTimer);
    }
  }, [timelinePhase, isPaused, userInspecting, isReducedMotion]);

  // 5. Compute Stage Card Build Step
  const getCardBuildStep = useCallback(
    (step: number): CardBuildStep => {
      if (isReducedMotion || timelinePhase === 'finale_settle') return 'completed';

      const prefix = `c${step}_`;
      if (timelinePhase.startsWith(prefix)) {
        const sub = timelinePhase.replace(prefix, '') as CardBuildStep;
        if (sub === ('done' as any)) return 'completed';
        return sub;
      }

      // Check if this card's index is already finished
      const phaseNum = parseInt(timelinePhase.slice(1, 2), 10);
      if (!isNaN(phaseNum)) {
        if (step < phaseNum) return 'completed';
        if (step > phaseNum) return 'idle';
      }

      if (timelinePhase === 'finale_wave') return 'completed';
      return 'idle';
    },
    [timelinePhase, isReducedMotion]
  );

  // 6. Compute Wire Build Step
  const getWireBuildStep = useCallback(
    (wireIdx: number): { step: WireBuildStep; progress: number; isIlluminated: boolean } => {
      if (isReducedMotion || timelinePhase === 'finale_settle') {
        return { step: 'completed', progress: 100, isIlluminated: true };
      }

      const prefix = `w${wireIdx}_`;
      if (timelinePhase.startsWith(prefix)) {
        const sub = timelinePhase.replace(prefix, '');
        if (sub === 'emit') return { step: 'emit', progress: 0, isIlluminated: false };
        if (sub === 'draw') return { step: 'draw', progress: wireProgress, isIlluminated: false };
        if (sub === 'arrive') return { step: 'arrive', progress: 100, isIlluminated: true };
        if (sub === 'done') return { step: 'completed', progress: 100, isIlluminated: true };
      }

      // If later stage is active, wire is already completed and steadily glowing
      const currentStageNum = parseInt(timelinePhase.slice(1, 2), 10);
      if (!isNaN(currentStageNum)) {
        if (timelinePhase.startsWith('c') && currentStageNum > wireIdx) {
          return { step: 'completed', progress: 100, isIlluminated: true };
        }
        if (timelinePhase.startsWith('w') && currentStageNum > wireIdx) {
          return { step: 'completed', progress: 100, isIlluminated: true };
        }
      }

      if (timelinePhase === 'finale_wave') {
        return { step: 'completed', progress: 100, isIlluminated: true };
      }

      return { step: 'idle', progress: 0, isIlluminated: false };
    },
    [timelinePhase, wireProgress, isReducedMotion]
  );

  // 7. User Action Handlers
  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleReplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsPaused(false);
    setUserInspecting(false);
    setWireProgress(0);
    setTimelinePhase('c1_spark');
    setActiveInfoStep(1);
  };

  const handleShowAll = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsPaused(false);
    setTimelinePhase('finale_settle');
    setWireProgress(100);
  };

  const handleSelectStage = (step: number) => {
    setUserInspecting(true);
    setActiveInfoStep(step);
    // Pause auto-progression while user inspects a specific stage
    setIsPaused(true);
  };

  const activeStage = stages.find((s) => s.step === activeInfoStep) || stages[0]!;
  const isFinaleWave = timelinePhase === 'finale_wave';
  const isFinaleSettled = timelinePhase === 'finale_settle';
  const isCompleted = isFinaleSettled;

  // Determine current constructing stage number for banner
  let currentConstructingNum: number | null = null;
  if (timelinePhase.startsWith('c')) {
    const num = parseInt(timelinePhase.slice(1, 2), 10);
    if (!isNaN(num)) currentConstructingNum = num;
  }

  return (
    <div ref={containerRef} className="space-y-8 sm:space-y-12">
      {/* ========================================================
          A. DESKTOP & TABLET: HORIZONTAL AUTOMATED PIPELINE (≥1024px)
          ======================================================== */}
      <div className="hidden lg:flex items-center justify-between gap-1 xl:gap-2 relative py-4">
        {stages.map((stage, idx) => {
          const cardStep = getCardBuildStep(stage.step);
          const wireInfo = idx < 4 ? getWireBuildStep(idx + 1) : null;
          const isCurrentFocus = cardStep !== 'idle' && cardStep !== 'completed';
          const isCardCompleted = cardStep === 'completed';
          const isSelected = stage.step === activeInfoStep;

          return (
            <React.Fragment key={stage.id}>
              {/* Individual Stage Card */}
              <ProcessStageCard
                stage={stage}
                buildStep={cardStep}
                isCompleted={isCardCompleted}
                isCurrentFocus={isCurrentFocus}
                isSelected={isSelected}
                isFinaleWave={isFinaleWave}
                isFinaleSettled={isFinaleSettled}
                direction="horizontal"
                onClick={() => handleSelectStage(stage.step)}
              />

              {/* Connecting Wire between Card N and Card N+1 */}
              {wireInfo && (
                <ProcessConnectingWire
                  wireIndex={idx + 1}
                  buildStep={wireInfo.step}
                  progress={wireInfo.progress}
                  isIlluminated={wireInfo.isIlluminated}
                  isFinaleWave={isFinaleWave}
                  isFinaleSettled={isFinaleSettled}
                  direction="horizontal"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ========================================================
          B. MOBILE: SEPARATE VERTICAL SPINE PIPELINE (<1024px)
          ======================================================== */}
      <div className="lg:hidden flex flex-col gap-1 relative py-2">
        {stages.map((stage, idx) => {
          const cardStep = getCardBuildStep(stage.step);
          const wireInfo = idx < 4 ? getWireBuildStep(idx + 1) : null;
          const isCurrentFocus = cardStep !== 'idle' && cardStep !== 'completed';
          const isCardCompleted = cardStep === 'completed';
          const isSelected = stage.step === activeInfoStep;

          return (
            <React.Fragment key={stage.id}>
              {/* Individual Compact Stage Card */}
              <ProcessStageCard
                stage={stage}
                buildStep={cardStep}
                isCompleted={isCardCompleted}
                isCurrentFocus={isCurrentFocus}
                isSelected={isSelected}
                isFinaleWave={isFinaleWave}
                isFinaleSettled={isFinaleSettled}
                direction="vertical"
                onClick={() => handleSelectStage(stage.step)}
              />

              {/* Vertical Connecting Wire */}
              {wireInfo && (
                <ProcessConnectingWire
                  wireIndex={idx + 1}
                  buildStep={wireInfo.step}
                  progress={wireInfo.progress}
                  isIlluminated={wireInfo.isIlluminated}
                  isFinaleWave={isFinaleWave}
                  isFinaleSettled={isFinaleSettled}
                  direction="vertical"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ========================================================
          C. SYNCHRONIZED DETAIL PANEL & USER CONTROLS
          ======================================================== */}
      <ProcessInfoPanel
        activeStage={activeStage}
        currentConstructingStage={currentConstructingNum}
        isPaused={isPaused}
        isCompleted={isCompleted}
        onTogglePause={handleTogglePause}
        onReplay={handleReplay}
        onShowAll={handleShowAll}
        onSelectStage={handleSelectStage}
      />
    </div>
  );
};
