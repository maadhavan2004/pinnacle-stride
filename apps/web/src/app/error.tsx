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
    <div className="py-20 sm:py-28 flex items-center justify-center">
      <Container size="narrow">
        <div className="text-center space-y-5">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>

          <span className="font-mono text-xs uppercase tracking-wider text-red-500 font-medium">
            500 · System Error
          </span>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text">
            Something unexpected occurred
          </h1>

          <p className="text-xs sm:text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
            Our telemetry has automatically logged this incident. You can try refreshing the current view.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Button size="sm" variant="primary" onClick={() => reset()}>
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Try Again
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
