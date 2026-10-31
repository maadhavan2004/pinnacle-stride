'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { cn } from './utils';
import { ShieldCheck, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ps_cookie_consent');
    if (!consent) {
      // Show banner after brief delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
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
      aria-label="Privacy and Cookie Preferences"
      className={cn(
        'fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl shadow-xl transition-all duration-300',
        'bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] text-[#0A1128] dark:text-[#F4F7FB]'
      )}
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#0EA5A4] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
        <div className="space-y-2 text-xs sm:text-sm">
          <p className="font-semibold text-sm">Privacy & Cookie Preferences</p>
          <p className="text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
            We use strictly necessary storage for theme preferences and authenticated admin sessions. We do not use third-party advertising cookies or cross-site tracking. Read our{' '}
            <a href="/cookies" className="text-[#1D4ED8] dark:text-[#3B82F6] hover:underline">
              Cookie Policy
            </a>.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2.5">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleChoice('rejected')}
          className="text-xs min-h-[36px]"
        >
          Reject Non-Essential
        </Button>
        <Button
          size="sm"
          variant="primary"
          onClick={() => handleChoice('accepted')}
          className="text-xs min-h-[36px]"
        >
          Accept All
        </Button>
      </div>
    </div>
  );
};
