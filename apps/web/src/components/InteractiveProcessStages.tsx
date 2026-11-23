'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ProcessStage } from '@ps/content';
import { ProcessStageCard, CardStatus } from './process/ProcessStageCard';
import { ProcessConnectingWire, WireStatus } from './process/ProcessConnectingWire';
import { ProcessInfoPanel } from './process/ProcessInfoPanel';

interface Props {
  stages: ProcessStage[];
}

export type TimelinePhase =
  | 'idle'
  | 'lead_in'
  // Stage 1 (Discovery)
  | 'b1_forming'
  | 'b1_typing'
  | 'b1_pause'
  // Wire 1
  | 'w1_growing'
  | 'w1_pulse'
  // Stage 2 (Planning)
  | 'b2_blinking'
  | 'b2_forming'
  | 'b2_typing'
  | 'b2_pause'
  // Wire 2
  | 'w2_growing'
  | 'w2_pulse'
  // Stage 3 (Development)
  | 'b3_blinking'
  | 'b3_forming'
  | 'b3_typing'
  | 'b3_pause'
  // Wire 3
  | 'w3_growing'
  | 'w3_pulse'
  // Stage 4 (Testing)
  | 'b4_blinking'
  | 'b4_forming'
  | 'b4_typing'
  | 'b4_pause'
  // Wire 4
  | 'w4_growing'
  | 'w4_pulse'
  // Stage 5 (Launch)
  | 'b5_blinking'
  | 'b5_forming'
  | 'b5_typing'
  | 'b5_pause'
  // Finale
  | 'finale_wave'
  | 'complete';

export const InteractiveProcessStages: React.FC<Props> = ({ stages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation State Machine
  const [phase, setPhase] = useState<TimelinePhase>('idle');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeInfoStep, setActiveInfoStep] = useState<number | null>(null);
  const [userInspecting, setUserInspecting] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Dynamic progress values
  const [wireProgress, setWireProgress] = useState<number>(0);
  const [typingCharIndex, setTypingCharIndex] = useState<number>(0);

  // Refs for clean cancellation
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Reduced Motion Detection & Intersection Observer (40% viewport trigger)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setIsReducedMotion(true);
        setPhase('complete');
        setActiveInfoStep(1);
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          setPhase((current) => (current === 'idle' ? 'lead_in' : current));
        } else if (entry && !entry.isIntersecting) {
          // Pause when scrolling away
          setIsPaused(true);
        }
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Tab visibility change
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
  }, []);

  // Compute total characters for a given stage
  const getStageTotalChars = useCallback(
    (step: number) => {
      const stage = stages.find((s) => s.step === step) || stages[step - 1];
      if (!stage) return 70;
      return `0${stage.step}`.length + stage.title.length + stage.summary.length;
    },
    [stages]
  );

  // 2. State Machine Transitions & Timers
  useEffect(() => {
    if (isPaused || phase === 'idle' || phase === 'complete') {
      return;
    }

    // Clean any prior timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    // --- A. LEAD-IN (0.8s) ---
    if (phase === 'lead_in') {
      timerRef.current = setTimeout(() => {
        setPhase('b1_forming');
      }, 800);
    }

    // --- B. BOX FORMING PHASES (2.0s, Launch 2.2s) ---
    else if (phase === 'b1_forming') {
      timerRef.current = setTimeout(() => {
        setTypingCharIndex(0);
        setPhase('b1_typing');
      }, 2000);
    } else if (phase === 'b2_forming') {
      timerRef.current = setTimeout(() => {
        setTypingCharIndex(0);
        setPhase('b2_typing');
      }, 2000);
    } else if (phase === 'b3_forming') {
      timerRef.current = setTimeout(() => {
        setTypingCharIndex(0);
        setPhase('b3_typing');
      }, 2000);
    } else if (phase === 'b4_forming') {
      timerRef.current = setTimeout(() => {
        setTypingCharIndex(0);
        setPhase('b4_typing');
      }, 2000);
    } else if (phase === 'b5_forming') {
      timerRef.current = setTimeout(() => {
        setTypingCharIndex(0);
        setPhase('b5_typing');
      }, 2200);
    }

    // --- C. BOX BLINKING PHASES (0.6s) ---
    else if (phase === 'b2_blinking') {
      timerRef.current = setTimeout(() => setPhase('b2_forming'), 600);
    } else if (phase === 'b3_blinking') {
      timerRef.current = setTimeout(() => setPhase('b3_forming'), 600);
    } else if (phase === 'b4_blinking') {
      timerRef.current = setTimeout(() => setPhase('b4_forming'), 600);
    } else if (phase === 'b5_blinking') {
      timerRef.current = setTimeout(() => setPhase('b5_forming'), 600);
    }

    // --- D. TYPEWRITER TYPING PHASES (~35ms per character) ---
    else if (
      phase === 'b1_typing' ||
      phase === 'b2_typing' ||
      phase === 'b3_typing' ||
      phase === 'b4_typing' ||
      phase === 'b5_typing'
    ) {
      const stepNum = parseInt(phase.slice(1, 2), 10);
      const totalChars = getStageTotalChars(stepNum);

      typingIntervalRef.current = setInterval(() => {
        setTypingCharIndex((prev) => {
          const next = prev + 1;
          if (next >= totalChars) {
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
            // Advance to pause phase
            setTimeout(() => {
              if (stepNum === 1) setPhase('b1_pause');
              else if (stepNum === 2) setPhase('b2_pause');
              else if (stepNum === 3) setPhase('b3_pause');
              else if (stepNum === 4) setPhase('b4_pause');
              else if (stepNum === 5) setPhase('b5_pause');
            }, 50);
          }
          return next;
        });
      }, 35);
    }

    // --- E. POST-TYPING PAUSE & INFO PANEL REVEAL (0.4s) ---
    else if (phase === 'b1_pause') {
      if (!userInspecting) setActiveInfoStep(1);
      timerRef.current = setTimeout(() => setPhase('w1_growing'), 400);
    } else if (phase === 'b2_pause') {
      if (!userInspecting) setActiveInfoStep(2);
      timerRef.current = setTimeout(() => setPhase('w2_growing'), 400);
    } else if (phase === 'b3_pause') {
      if (!userInspecting) setActiveInfoStep(3);
      timerRef.current = setTimeout(() => setPhase('w3_growing'), 400);
    } else if (phase === 'b4_pause') {
      if (!userInspecting) setActiveInfoStep(4);
      timerRef.current = setTimeout(() => setPhase('w4_growing'), 400);
    } else if (phase === 'b5_pause') {
      if (!userInspecting) setActiveInfoStep(5);
      timerRef.current = setTimeout(() => setPhase('finale_wave'), 400);
    }

    // --- F. WIRE GROWING & TRAVELLING PARTICLE (1.8s) ---
    else if (
      phase === 'w1_growing' ||
      phase === 'w2_growing' ||
      phase === 'w3_growing' ||
      phase === 'w4_growing'
    ) {
      const wireNum = parseInt(phase.slice(1, 2), 10);
      const duration = 1800;
      const startTime = performance.now();

      const animateWire = (now: number) => {
        const elapsed = now - startTime;
        const pct = Math.min(100, Math.round((elapsed / duration) * 100));
        setWireProgress(pct);

        if (elapsed < duration) {
          animFrameRef.current = requestAnimationFrame(animateWire);
        } else {
          setWireProgress(100);
          if (wireNum === 1) setPhase('w1_pulse');
          else if (wireNum === 2) setPhase('w2_pulse');
          else if (wireNum === 3) setPhase('w3_pulse');
          else if (wireNum === 4) setPhase('w4_pulse');
        }
      };

      animFrameRef.current = requestAnimationFrame(animateWire);
    }

    // --- G. WIRE ARRIVAL PULSE (0.3s) ---
    else if (phase === 'w1_pulse') {
      timerRef.current = setTimeout(() => {
        setWireProgress(0);
        setPhase('b2_blinking');
      }, 300);
    } else if (phase === 'w2_pulse') {
      timerRef.current = setTimeout(() => {
        setWireProgress(0);
        setPhase('b3_blinking');
      }, 300);
    } else if (phase === 'w3_pulse') {
      timerRef.current = setTimeout(() => {
        setWireProgress(0);
        setPhase('b4_blinking');
      }, 300);
    } else if (phase === 'w4_pulse') {
      timerRef.current = setTimeout(() => {
        setWireProgress(0);
        setPhase('b5_blinking');
      }, 300);
    }

    // --- H. FINALE WAVE (1.8s) ---
    else if (phase === 'finale_wave') {
      timerRef.current = setTimeout(() => {
        setPhase('complete');
      }, 1800);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [phase, isPaused, userInspecting, getStageTotalChars]);

  // 3. Status Derivation for Each Card
  const getCardStatus = useCallback(
    (step: number): { status: CardStatus; typedCount: number } => {
      if (isReducedMotion || phase === 'complete' || phase === 'finale_wave') {
        return { status: 'completed', typedCount: 999 };
      }

      // Check current phase prefix
      const currentBoxNum = parseInt(phase.slice(1, 2), 10);
      const isBoxPhase = phase.startsWith('b');
      const isWirePhase = phase.startsWith('w');

      // Before this card starts
      if (
        phase === 'idle' ||
        phase === 'lead_in' ||
        (isBoxPhase && currentBoxNum < step) ||
        (isWirePhase && currentBoxNum < step)
      ) {
        return { status: 'hidden', typedCount: 0 };
      }

      // This card is currently forming or typing
      if (isBoxPhase && currentBoxNum === step) {
        if (phase.endsWith('_blinking')) return { status: 'blinking', typedCount: 0 };
        if (phase.endsWith('_forming')) return { status: 'forming', typedCount: 0 };
        if (phase.endsWith('_typing')) return { status: 'typing', typedCount: typingCharIndex };
        if (phase.endsWith('_pause')) return { status: 'completed', typedCount: 999 };
      }

      // Card is already finished and wire/later card is active
      if (
        (isWirePhase && currentBoxNum >= step) ||
        (isBoxPhase && currentBoxNum > step)
      ) {
        return { status: 'completed', typedCount: 999 };
      }

      return { status: 'hidden', typedCount: 0 };
    },
    [phase, typingCharIndex, isReducedMotion]
  );

  // 4. Status Derivation for Each Wire
  const getWireStatus = useCallback(
    (wireIdx: number): { status: WireStatus; progress: number; isArrivalPulse: boolean } => {
      if (isReducedMotion || phase === 'complete' || phase === 'finale_wave') {
        return { status: 'completed', progress: 100, isArrivalPulse: false };
      }

      const isWirePhase = phase.startsWith('w');
      const currentWireNum = isWirePhase ? parseInt(phase.slice(1, 2), 10) : null;
      const isBoxPhase = phase.startsWith('b');
      const currentBoxNum = isBoxPhase ? parseInt(phase.slice(1, 2), 10) : null;

      // Currently growing wire
      if (isWirePhase && currentWireNum === wireIdx) {
        if (phase.endsWith('_growing')) {
          return { status: 'drawing', progress: wireProgress, isArrivalPulse: false };
        }
        if (phase.endsWith('_pulse')) {
          return { status: 'completed', progress: 100, isArrivalPulse: true };
        }
      }

      // Completed wire (later stage or wire active)
      if (
        (isWirePhase && currentWireNum !== null && currentWireNum > wireIdx) ||
        (isBoxPhase && currentBoxNum !== null && currentBoxNum > wireIdx)
      ) {
        return { status: 'completed', progress: 100, isArrivalPulse: false };
      }

      return { status: 'hidden', progress: 0, isArrivalPulse: false };
    },
    [phase, wireProgress, isReducedMotion]
  );

  // 5. User Control Handlers
  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleReplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    setIsPaused(false);
    setUserInspecting(false);
    setWireProgress(0);
    setTypingCharIndex(0);
    setActiveInfoStep(null);
    setPhase('lead_in');
  };

  const handleShowAll = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    setIsPaused(false);
    setPhase('complete');
    setActiveInfoStep(1);
    setWireProgress(100);
    setTypingCharIndex(999);
  };

  const handleSelectStage = (step: number) => {
    setUserInspecting(true);
    setActiveInfoStep(step);
    setIsPaused(true);
  };

  const activeStage = activeInfoStep
    ? stages.find((s) => s.step === activeInfoStep) || stages[0]!
    : null;

  const isFinaleWave = phase === 'finale_wave';
  const isFinaleSettled = phase === 'complete';
  const isCompleted = isFinaleSettled;

  // Status banner text
  let statusText = 'Awaiting Viewport Entry...';
  if (phase === 'lead_in') statusText = 'Initializing Cosmic Pipeline...';
  else if (phase.startsWith('b') && phase.includes('forming')) {
    statusText = `Constructing Box 0${phase.slice(1, 2)} Frame...`;
  } else if (phase.startsWith('b') && phase.includes('typing')) {
    statusText = `Typing Specifications Inside Box 0${phase.slice(1, 2)}...`;
  } else if (phase.startsWith('w') && phase.includes('growing')) {
    statusText = `Extending Circuit Conduit 0${phase.slice(1, 2)}...`;
  } else if (isFinaleWave) {
    statusText = 'Grand Illumination Wave Sweeping Pipeline...';
  } else if (isCompleted) {
    statusText = 'Complete Engineering Journey Online • All Stages Connected';
  } else if (isPaused) {
    statusText = 'Animation Paused • Press Resume to Continue';
  }

  return (
    <div ref={containerRef} className="space-y-8 sm:space-y-12">
      {/* ========================================================
          A. DESKTOP & TABLET: HORIZONTAL SEQUENTIAL PIPELINE (≥1024px)
          ======================================================== */}
      <div className="hidden lg:flex items-center justify-between gap-1 xl:gap-2 relative py-4">
        {stages.map((stage, idx) => {
          const { status, typedCount } = getCardStatus(stage.step);
          const wireInfo = idx < 4 ? getWireStatus(idx + 1) : null;
          const isCurrentFocus =
            status === 'forming' || status === 'typing' || status === 'blinking';
          const isSelected = stage.step === activeInfoStep;

          return (
            <React.Fragment key={stage.id}>
              {/* Individual Stage Card */}
              <ProcessStageCard
                stage={stage}
                status={status}
                typedCount={typedCount}
                isCurrentFocus={isCurrentFocus}
                isSelected={isSelected}
                isFinaleWave={isFinaleWave}
                isFinaleSettled={isFinaleSettled}
                direction="horizontal"
                onClick={() => handleSelectStage(stage.step)}
              />

              {/* Connecting Wire Component */}
              {wireInfo && (
                <ProcessConnectingWire
                  wireIndex={idx + 1}
                  status={wireInfo.status}
                  progress={wireInfo.progress}
                  isArrivalPulse={wireInfo.isArrivalPulse}
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
          const { status, typedCount } = getCardStatus(stage.step);
          const wireInfo = idx < 4 ? getWireStatus(idx + 1) : null;
          const isCurrentFocus =
            status === 'forming' || status === 'typing' || status === 'blinking';
          const isSelected = stage.step === activeInfoStep;

          return (
            <React.Fragment key={stage.id}>
              {/* Individual Compact Stage Card */}
              <ProcessStageCard
                stage={stage}
                status={status}
                typedCount={typedCount}
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
                  status={wireInfo.status}
                  progress={wireInfo.progress}
                  isArrivalPulse={wireInfo.isArrivalPulse}
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
        currentStatusText={statusText}
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
