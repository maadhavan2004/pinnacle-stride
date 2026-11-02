import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md shadow-md border border-border"
    >
      Skip to main content
    </a>
  );
};
