'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { cn } from './utils';
import { ShieldCheck } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ps_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (choice: 'accepted' | 'rejected') => {
    localStorage.setItem('ps_cookie_consent', choice);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy Preferences"
      className={cn(
        'fixed bottom-5 right-5 left-5 sm:left-auto sm:max-w-sm z-50 p-4 rounded-xl shadow-lg border border-border backdrop-blur-md bg-surface/95 text-text animate-in fade-in slide-in-from-bottom-2 duration-200'
      )}
    >
      <div className="flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <p className="font-medium text-text">Privacy Preferences</p>
          <p className="text-text-muted leading-relaxed text-[11px]">
            We use strictly essential local storage for theme preferences and session tokens. No third-party ad tracking.{' '}
            <a href="/cookies" className="text-primary hover:underline">
              Cookie Policy
            </a>.
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-border/50">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleChoice('rejected')}
          className="text-xs h-7 px-2.5"
        >
          Essential Only
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleChoice('accepted')}
          className="text-xs h-7 px-3"
        >
          Accept
        </Button>
      </div>
    </div>
  );
};
