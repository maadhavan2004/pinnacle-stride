import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Card, Button, SectionHeading, Badge } from '@ps/ui';
import { servicesData } from '@ps/content';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Services — Tailored Web, AI & Cloud Solutions',
  description:
    'Explore PinnacleStride services: Websites & Business Solutions, Full-Stack Applications, AI/ML, Generative AI & Agentic AI, and Cloud Infrastructure.',
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-20 sm:gap-28 py-12 sm:py-20">
      {/* Services Header */}
      <section>
        <Container size="narrow">
          <div className="text-center space-y-4">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#1D4ED8] dark:text-[#3B82F6] font-semibold">
              Capabilities & Offerings
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A1128] dark:text-[#F4F7FB]">
              Engineering Services Built for Impact.
            </h1>
            <p className="text-base sm:text-lg text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed max-w-2xl mx-auto pt-2">
              We deliver custom digital solutions engineered with strict type safety, open standards, and verifiable results. No cookie-cutter templates, no bloat.
            </p>
            {/* Scoping Note per PRD §1.7 & FR-31 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6] text-xs font-mono font-medium border border-[#1D4ED8]/20 mt-4">
              <ShieldCheck className="w-4 h-4" />
              <span>We scope projects to our team's real skills, timeline, and resources.</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Listing (All 5 Categories) */}
      <section>
        <Container>
          <div className="space-y-16">
            {servicesData.map((service, index) => (
              <div
                key={service.slug}
                id={service.slug}
                className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] shadow-sm flex flex-col lg:flex-row gap-10 items-start justify-between"
              >
                {/* Left Overview Column */}
                <div className="lg:max-w-xl space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6]">
                      0{index + 1}
                    </span>
                    <Badge variant="default">{service.serviceType.replace('_', ' ')}</Badge>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1128] dark:text-[#F4F7FB]">
                    {service.title}
                  </h2>

                  <p className="text-sm sm:text-base font-medium text-[#0EA5A4] dark:text-[#2DD4BF]">
                    {service.tagline}
                  </p>

                  <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                    {service.summary}
                  </p>

                  <div className="pt-2">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1128] dark:text-[#F4F7FB] mb-2">
                      Business Problem Addressed:
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed bg-[#F4F7FB] dark:bg-[#0A1128] p-4 rounded-xl border border-[#D8E0EE] dark:border-[#22305A]">
                      {service.problemSolved}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link href={`/contact?service=${service.serviceType}`}>
                      <Button size="md" variant="primary">
                        Discuss Your Requirements
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </Link>
                    <Link href={`/services/${service.slug}`}>
                      <Button size="md" variant="secondary">
                        Service Details
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right What We Build Column */}
                <div className="w-full lg:w-96 space-y-6 bg-[#F4F7FB]/60 dark:bg-[#0F1A38]/60 p-6 rounded-2xl border border-[#D8E0EE] dark:border-[#22305A]">
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1128] dark:text-[#F4F7FB] mb-3">
                      What We Build:
                    </h3>
                    <ul className="space-y-2.5">
                      {service.whatWeBuild.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#4A5878] dark:text-[#A9B6D3]">
                          <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#D8E0EE] dark:border-[#22305A]">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1128] dark:text-[#F4F7FB] mb-2">
                      Technology Stack:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.techFocus.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] text-[#0A1128] dark:text-[#F4F7FB]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
