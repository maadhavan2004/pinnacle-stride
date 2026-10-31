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
    <div className="py-12 sm:py-20">
      <Container size="narrow">
        <div className="space-y-6 pb-10 border-b border-[#D8E0EE] dark:border-[#22305A]">
          <span className="text-xs font-mono uppercase tracking-wider text-[#0EA5A4] dark:text-[#2DD4BF] font-semibold">
            Digital Privacy
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1128] dark:text-[#F4F7FB]">
            {doc.title}
          </h1>
          <div className="text-xs font-mono text-[#4A5878] dark:text-[#A9B6D3]">
            Last Updated: {doc.lastUpdated}
          </div>

          <div className="p-5 rounded-2xl bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6] border border-[#1D4ED8]/25 text-sm leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Plain-Language Summary: </span>
              {doc.summary}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="py-10 space-y-10">
          {doc.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                {section.heading}
              </h2>
              <p className="text-sm sm:text-base text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
