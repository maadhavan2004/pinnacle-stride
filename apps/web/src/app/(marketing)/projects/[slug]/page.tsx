import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, Button, Card, Badge } from '@ps/ui';
import { projectsData } from '@ps/content';
import { ArrowLeft, ArrowRight, CheckCircle2, Github, ExternalLink, ShieldCheck } from 'lucide-react';

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
    { id: 'links', title: project.results ? '8. Links & Artifacts' : '7. Links & Artifacts' },
  ];

  return (
    <div className="py-12 sm:py-20">
      <Container>
        {/* Back navigation */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#4A5878] dark:text-[#A9B6D3] hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all case studies</span>
        </Link>

        {/* Case Study Header */}
        <div className="max-w-4xl space-y-5 pb-12 border-b border-[#D8E0EE] dark:border-[#22305A]">
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant={
                project.projectType === 'INTERNAL_PORTFOLIO'
                  ? 'portfolio'
                  : project.projectType === 'INDEPENDENT_PRODUCT'
                  ? 'product'
                  : 'client'
              }
            >
              {project.projectType === 'INTERNAL_PORTFOLIO'
                ? 'Internal Portfolio Project'
                : project.projectType === 'INDEPENDENT_PRODUCT'
                ? 'Independent Product'
                : 'Paid Client Work'}
            </Badge>
            <span className="text-xs font-mono text-[#0EA5A4] dark:text-[#2DD4BF]">
              {project.category.replace('_', ' ')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1128] dark:text-[#F4F7FB] leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
            {project.summary}
          </p>

          {/* Quick links & meta */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-[#1D4ED8] dark:bg-[#3B82F6] text-white hover:opacity-95"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] text-[#0A1128] dark:text-[#F4F7FB] hover:border-[#3B82F6]"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* 2-Column Content Layout: Desktop Sticky TOC + Case Study Body */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pt-12 items-start">
          {/* Sticky Desktop Table of Contents */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-28 space-y-4 p-5 rounded-2xl bg-[#F4F7FB]/70 dark:bg-[#0F1A38]/70 border border-[#D8E0EE] dark:border-[#22305A]">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1128] dark:text-[#F4F7FB]">
              Case Study Navigation
            </div>
            <nav className="space-y-2 text-xs">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-[#4A5878] dark:text-[#A9B6D3] hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] py-1 transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </nav>
            <div className="pt-4 border-t border-[#D8E0EE] dark:border-[#22305A]">
              <Link href={`/contact?service=${project.category}`}>
                <Button size="sm" variant="primary" className="w-full text-xs">
                  Discuss a similar project
                </Button>
              </Link>
            </div>
          </aside>

          {/* Main Case Study Sections */}
          <div className="lg:col-span-3 space-y-14">
            {/* 1. Overview */}
            <section id="overview" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                1. Project Overview
              </h2>
              <p className="text-sm sm:text-base text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                {project.overview}
              </p>
            </section>

            {/* 2. Problem */}
            <section id="problem" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                2. Problem Statement
              </h2>
              <div className="p-5 rounded-2xl bg-[#F4F7FB] dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A]">
                <p className="text-sm sm:text-base text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                  {project.problem}
                </p>
              </div>
            </section>

            {/* 3. Solution */}
            <section id="solution" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                3. Technical Solution & Architecture
              </h2>
              <p className="text-sm sm:text-base text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                {project.solution}
              </p>
            </section>

            {/* 4. Features */}
            <section id="features" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                4. Key Features & Implementation
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] text-xs sm:text-sm text-[#0A1128] dark:text-[#F4F7FB] flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Technologies */}
            <section id="technologies" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                5. Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] font-mono text-xs font-semibold text-[#0A1128] dark:text-[#F4F7FB]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* 6. Contribution */}
            <section id="contribution" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                6. Our Contribution & Engineering Ownership
              </h2>
              <p className="text-sm sm:text-base text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                {project.contribution}
              </p>
            </section>

            {/* 7. Results (Omitted if null per FR-53) */}
            {project.results && (
              <section id="results" className="scroll-mt-28 space-y-3">
                <h2 className="text-xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                  7. Verified Outcomes & Results
                </h2>
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300">
                  <p className="text-sm sm:text-base leading-relaxed">{project.results}</p>
                </div>
              </section>
            )}

            {/* 8. Links & CTA */}
            <section id="links" className="scroll-mt-28 pt-8 border-t border-[#D8E0EE] dark:border-[#22305A] space-y-6">
              <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1D4ED8]/10 via-[#0EA5A4]/10 to-transparent border border-[#1D4ED8]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                    Interested in a similar architecture?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5878] dark:text-[#A9B6D3] mt-1">
                    Let's discuss how we can adapt this approach for your operational needs.
                  </p>
                </div>
                <Link href={`/contact?service=${project.category}`}>
                  <Button size="md" variant="primary">
                    Discuss a Similar Project
                    <ArrowRight className="w-4 h-4 ml-1.5" />
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
