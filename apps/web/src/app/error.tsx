'use client';

import React, { useEffect } from 'react';
import { Container, Button } from '@ps/ui';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application runtime error boundary caught:', error);
  }, [error]);

  return (
    <div className="py-24 sm:py-32 flex items-center justify-center">
      <Container size="narrow">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <span className="font-mono text-xs uppercase tracking-wider text-red-600 dark:text-red-400 font-semibold">
            System Error
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A1128] dark:text-[#F4F7FB]">
            Something unexpected occurred.
          </h1>

          <p className="text-sm sm:text-base text-[#4A5878] dark:text-[#A9B6D3] max-w-md mx-auto leading-relaxed">
            Our team has been automatically alerted through our error telemetry. Please try reloading this section.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Button size="md" variant="primary" onClick={() => reset()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
