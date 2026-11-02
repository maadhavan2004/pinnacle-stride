import React from 'react';
import Link from 'next/link';
import { Container, Button } from '@ps/ui';
import { Compass, Home, PhoneCall, Layers } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-20 sm:py-28 flex items-center justify-center">
      <Container size="narrow">
        <div className="text-center space-y-5">
          <div className="w-12 h-12 rounded-xl bg-surface border border-border text-text-subtle flex items-center justify-center mx-auto shadow-xs">
            <Compass className="w-5 h-5 text-primary" />
          </div>

          <span className="font-mono text-xs uppercase tracking-wider text-text-subtle font-medium">
            404 · Resource Not Found
          </span>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text">
            Page does not exist
          </h1>

          <p className="text-xs sm:text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
            The page or resource you are looking for has been moved, renamed, or is unavailable.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href="/">
              <Button size="sm" variant="primary">
                <Home className="w-3.5 h-3.5 mr-1.5" />
                Return Home
              </Button>
            </Link>
            <Link href="/services">
              <Button size="sm" variant="secondary">
                <Layers className="w-3.5 h-3.5 mr-1.5" />
                Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="sm" variant="outline">
                <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
