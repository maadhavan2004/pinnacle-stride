import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@ps/ui';
import { legalDocuments } from '@ps/content';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy — PinnacleStride',
  description: 'Our cookie policy and local storage transparency.',
};

export default function CookiesPage() {
  const doc = legalDocuments.cookies!;

  return (
    <div className="py-12 sm:py-16">
      <Container size="narrow">
        <div className="space-y-4 pb-8 border-b border-border">
          <span className="text-xs font-mono uppercase tracking-wider text-text-subtle font-semibold">
            Digital Privacy
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text">
            {doc.title}
          </h1>
          <div className="text-xs font-mono text-text-muted">
            Last Updated: {doc.lastUpdated}
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border text-xs leading-relaxed flex items-start gap-3 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-text">Plain-Language Summary: </span>
              <span className="text-text-muted">{doc.summary}</span>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="py-8 space-y-8">
          {doc.sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="text-base sm:text-lg font-semibold text-text">
                {section.heading}
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
