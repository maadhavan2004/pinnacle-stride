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
    return <div className="w-8 h-8" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="w-8 h-8 rounded-md flex items-center justify-center text-text-muted hover:text-text hover:bg-surface-hover transition-colors border border-transparent hover:border-border"
    >
      {theme === 'dark' ? (
        <Sun className="w-3.5 h-3.5 text-text-subtle hover:text-text transition-colors" aria-hidden="true" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-text-subtle hover:text-text transition-colors" aria-hidden="true" />
      )}
    </button>
  );
};
