import React from 'react';
import Link from 'next/link';
import { Container, Button } from '@ps/ui';
import { ArrowLeft, Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 flex items-center justify-center">
      <Container size="narrow">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6] flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8" />
          </div>

          <span className="font-mono text-xs uppercase tracking-wider text-[#0EA5A4] dark:text-[#2DD4BF] font-semibold">
            Error 404 · Page Not Found
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1128] dark:text-[#F4F7FB]">
            Lost in the Codebase?
          </h1>

          <p className="text-sm sm:text-base text-[#4A5878] dark:text-[#A9B6D3] max-w-md mx-auto leading-relaxed">
            The route or resource you are looking for has been moved, renamed, or does not exist.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/">
              <Button size="md" variant="primary">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
            <Link href="/services">
              <Button size="md" variant="secondary">
                View Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="md" variant="outline">
                Contact Team
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
