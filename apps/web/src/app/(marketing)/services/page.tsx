import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Card, Button, SectionHeading, Badge } from '@ps/ui';
import { servicesData } from '@ps/content';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Services — Tailored Web, AI & Cloud Solutions',
  description:
    'Explore PinnacleStride services: Websites & Business Solutions, Full-Stack Applications, AI/ML, Generative AI & Agentic AI, and Cloud Infrastructure.',
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-16 sm:gap-24 py-10 sm:py-16">
      {/* Services Header */}
      <section>
        <Container size="narrow">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
              Capabilities
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
              Engineering Services Built for Impact.
            </h1>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-xl mx-auto pt-1">
              We deliver custom digital solutions engineered with strict type safety, open standards, and verifiable results. No cookie-cutter templates, no bloat.
            </p>
            {/* Scoping Note */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-[11px] font-mono text-text-muted mt-3 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>We scope projects to our team's real skills, timeline, and resources.</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Listing */}
      <section>
        <Container>
          <div className="space-y-8">
            {servicesData.map((service, index) => (
              <div
                key={service.slug}
                id={service.slug}
                className="p-6 sm:p-8 rounded-xl bg-surface border border-border shadow-xs flex flex-col lg:flex-row gap-8 items-start justify-between"
              >
                {/* Left Overview Column */}
                <div className="lg:max-w-xl space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-surface-hover border border-border text-text">
                      0{index + 1}
                    </span>
                    <Badge variant="default">{service.serviceType.replace('_', ' ')}</Badge>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-text">
                    {service.title}
                  </h2>

                  <p className="text-xs sm:text-sm font-medium text-primary">
                    {service.tagline}
                  </p>

                  <p className="text-xs text-text-muted leading-relaxed">
                    {service.summary}
                  </p>

                  <div className="pt-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-text-subtle mb-1.5">
                      Business Problem Addressed:
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed bg-bg-subtle p-3 rounded-lg border border-border">
                      {service.problemSolved}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <Link href={`/contact?service=${service.serviceType}`}>
                      <Button size="sm" variant="primary">
                        Discuss Requirements
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                    <Link href={`/services/${service.slug}`}>
                      <Button size="sm" variant="secondary">
                        Service Details
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right What We Build Column */}
                <div className="w-full lg:w-80 space-y-4 bg-bg-subtle/70 p-5 rounded-lg border border-border text-xs">
                  <div>
                    <h3 className="text-[11px] font-mono uppercase tracking-wider text-text font-semibold mb-2.5">
                      What We Build:
                    </h3>
                    <ul className="space-y-2">
                      {service.whatWeBuild.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-text-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle mb-1.5">
                      Tech Focus:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {service.techFocus.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-text"
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
