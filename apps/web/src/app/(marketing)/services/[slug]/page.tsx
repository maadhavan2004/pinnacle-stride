import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, Button, Card, Badge } from '@ps/ui';
import { servicesData } from '@ps/content';
import { CheckCircle2, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} — PinnacleStride Services`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-12 sm:gap-16 py-10 sm:py-16">
      <Container size="narrow">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all services</span>
        </Link>

        <div className="space-y-4">
          <Badge variant="default">{service.serviceType.replace('_', ' ')}</Badge>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-text">
            {service.title}
          </h1>
          <p className="text-sm font-medium text-primary">
            {service.tagline}
          </p>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            {service.summary}
          </p>

          <div className="p-3 rounded-lg bg-surface border border-border text-xs font-mono text-text-muted flex items-center gap-2 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span>{service.scopingNote}</span>
          </div>
        </div>
      </Container>

      {/* Deep Dive Section */}
      <section className="bg-bg-subtle/50 py-12 sm:py-14 border-y border-border">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Problem */}
            <Card className="p-6 space-y-3">
              <h2 className="text-sm font-semibold text-text">
                The Business Problem
              </h2>
              <p className="text-xs text-text-muted leading-relaxed">
                {service.problemSolved}
              </p>
            </Card>

            {/* Expected Deliverables */}
            <Card className="p-6 space-y-3">
              <h2 className="text-sm font-semibold text-text">
                Standard Deliverables
              </h2>
              <ul className="space-y-2">
                {service.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* What We Build & Tech Stack */}
      <Container size="narrow">
        <div className="space-y-10">
          <div>
            <h2 className="text-base font-semibold text-text mb-4">
              What We Build Under This Service
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.whatWeBuild.map((item, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg bg-surface border border-border text-xs text-text flex items-start gap-2.5 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-mono uppercase tracking-wider text-text-subtle mb-3">
              Core Technologies Used
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {service.techFocus.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-surface border border-border text-xs font-mono font-medium text-text"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-text">
                Ready to review requirements?
              </h3>
              <p className="text-xs text-text-muted">
                We'll review your scope and provide a transparent feasibility response.
              </p>
            </div>
            <Link href={`/contact?service=${service.serviceType}`}>
              <Button size="md" variant="primary">
                Discuss Requirements
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
