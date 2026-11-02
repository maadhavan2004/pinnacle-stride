import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, Button, Card, Badge } from '@ps/ui';
import { projectsData } from '@ps/content';
import { ArrowLeft, ArrowRight, CheckCircle2, Github, ExternalLink } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const sections = [
    { id: 'overview', title: '1. Overview' },
    { id: 'problem', title: '2. Problem Statement' },
    { id: 'solution', title: '3. Technical Solution' },
    { id: 'features', title: '4. Key Features' },
    { id: 'technologies', title: '5. Technology Stack' },
    { id: 'contribution', title: '6. Our Contribution' },
    ...(project.results ? [{ id: 'results', title: '7. Verified Results' }] : []),
    { id: 'links', title: project.results ? '8. Links & Inquiry' : '7. Links & Inquiry' },
  ];

  return (
    <div className="py-10 sm:py-16">
      <Container>
        {/* Back navigation */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all case studies</span>
        </Link>

        {/* Case Study Header */}
        <div className="max-w-3xl space-y-4 pb-8 border-b border-border">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={
                project.projectType === 'INTERNAL_PORTFOLIO'
                  ? 'portfolio'
                  : project.projectType === 'INDEPENDENT_PRODUCT'
                  ? 'product'
                  : 'client'
              }
              size="sm"
            >
              {project.projectType === 'INTERNAL_PORTFOLIO'
                ? 'Internal Portfolio Project'
                : project.projectType === 'INDEPENDENT_PRODUCT'
                ? 'Independent Product'
                : 'Paid Client Work'}
            </Badge>
            <span className="text-[10px] font-mono text-text-subtle">
              {project.category.replace('_', ' ')}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-text leading-tight">
            {project.title}
          </h1>

          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            {project.summary}
          </p>

          {/* Quick links & meta */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-text text-bg hover:opacity-90 shadow-xs transition-opacity"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-surface border border-border text-text hover:bg-surface-hover shadow-xs transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* 2-Column Content Layout: Desktop Sticky TOC + Case Study Body */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pt-10 items-start">
          {/* Sticky Desktop Table of Contents */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-24 space-y-3 p-4 rounded-xl bg-surface border border-border text-xs">
            <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle font-semibold">
              Contents
            </div>
            <nav className="space-y-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-text-muted hover:text-text py-1 transition-colors text-xs"
                >
                  {s.title}
                </a>
              ))}
            </nav>
            <div className="pt-3 border-t border-border">
              <Link href={`/contact?service=${project.category}`}>
                <Button size="sm" variant="secondary" className="w-full text-xs">
                  Discuss similar scope
                </Button>
              </Link>
            </div>
          </aside>

          {/* Main Case Study Sections */}
          <div className="lg:col-span-3 space-y-10">
            {/* 1. Overview */}
            <section id="overview" className="scroll-mt-24 space-y-2">
              <h2 className="text-base font-semibold text-text">
                1. Project Overview
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {project.overview}
              </p>
            </section>

            {/* 2. Problem */}
            <section id="problem" className="scroll-mt-24 space-y-2">
              <h2 className="text-base font-semibold text-text">
                2. Problem Statement
              </h2>
              <div className="p-4 rounded-xl bg-bg-subtle border border-border">
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {project.problem}
                </p>
              </div>
            </section>

            {/* 3. Solution */}
            <section id="solution" className="scroll-mt-24 space-y-2">
              <h2 className="text-base font-semibold text-text">
                3. Technical Solution & Architecture
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {project.solution}
              </p>
            </section>

            {/* 4. Features */}
            <section id="features" className="scroll-mt-24 space-y-3">
              <h2 className="text-base font-semibold text-text">
                4. Key Features & Implementation
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-surface border border-border text-xs text-text flex items-start gap-2 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Technologies */}
            <section id="technologies" className="scroll-mt-24 space-y-2">
              <h2 className="text-base font-semibold text-text">
                5. Technology Stack
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-surface border border-border font-mono text-xs text-text"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* 6. Contribution */}
            <section id="contribution" className="scroll-mt-24 space-y-2">
              <h2 className="text-base font-semibold text-text">
                6. Our Contribution & Engineering Ownership
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {project.contribution}
              </p>
            </section>

            {/* 7. Results (Omitted if null) */}
            {project.results && (
              <section id="results" className="scroll-mt-24 space-y-2">
                <h2 className="text-base font-semibold text-text">
                  7. Verified Outcomes & Results
                </h2>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <p className="text-xs sm:text-sm leading-relaxed">{project.results}</p>
                </div>
              </section>
            )}

            {/* 8. Links & CTA */}
            <section id="links" className="scroll-mt-24 pt-6 border-t border-border space-y-4">
              <div className="p-6 rounded-xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                <div>
                  <h3 className="text-sm font-semibold text-text">
                    Interested in a similar architecture?
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Let's discuss how we can adapt this approach for your operational needs.
                  </p>
                </div>
                <Link href={`/contact?service=${project.category}`}>
                  <Button size="sm" variant="primary">
                    Discuss Scope
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
