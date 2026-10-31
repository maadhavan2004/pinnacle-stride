'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('ps_theme') as 'dark' | 'light' | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      // Default to dark palette
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('ps_theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  if (!mounted) {
    return <div className="w-10 h-10" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="p-2.5 rounded-lg border border-[#D8E0EE] dark:border-[#22305A] bg-[#F4F7FB] dark:bg-[#131F42] text-[#0A1128] dark:text-[#F4F7FB] hover:border-[#1D4ED8] dark:hover:border-[#3B82F6] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-[#2DD4BF]" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
      )}
    </button>
  );
};
