import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#1D4ED8] text-white font-medium rounded-lg shadow-lg"
    >
      Skip to main content
    </a>
  );
};
