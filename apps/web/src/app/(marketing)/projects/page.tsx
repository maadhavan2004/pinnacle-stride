import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@ps/ui';
import { projectsData } from '@ps/content';
import { ProjectFilterGrid } from '@/features/projects/ProjectFilterGrid';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies — Verified Engineering Work',
  description:
    'Explore PinnacleStride’s portfolio of internal software products, RAG systems, full-stack web platforms, and experimental prototypes.',
};

export default function ProjectsPage() {
  return (
    <div className="py-10 sm:py-16 space-y-12">
      <Container size="narrow">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
            Evidence of Engineering
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
            Portfolio & Case Studies.
          </h1>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-xl mx-auto pt-1">
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
