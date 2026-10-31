import React from 'react';
import type { Metadata } from 'next';
import { Container, SectionHeading } from '@ps/ui';
import { projectsData } from '@ps/content';
import { ProjectFilterGrid } from '@/features/projects/ProjectFilterGrid';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies — Verified Engineering Work',
  description:
    'Explore PinnacleStride’s portfolio of internal software products, RAG systems, full-stack web platforms, and experimental prototypes.',
};

export default function ProjectsPage() {
  return (
    <div className="py-12 sm:py-20 space-y-16">
      <Container size="narrow">
        <div className="text-center space-y-4">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#1D4ED8] dark:text-[#3B82F6] font-semibold">
            Evidence of Engineering
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A1128] dark:text-[#F4F7FB]">
            Portfolio & Case Studies.
          </h1>
          <p className="text-base sm:text-lg text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed max-w-2xl mx-auto pt-2">
            Every project listed here is built and maintained by our engineering team. We clearly separate independent products, internal portfolio projects, and paid client work.
          </p>
        </div>
      </Container>

      <Container>
        <ProjectFilterGrid projects={projectsData} />
      </Container>
    </div>
  );
}
