import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, Button, Card, Badge, SectionHeading } from '@ps/ui';
import { servicesData } from '@ps/content';
import { CheckCircle2, ArrowRight, ShieldCheck, ArrowLeft, Terminal } from 'lucide-react';

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
    <div className="flex flex-col gap-16 sm:gap-24 py-12 sm:py-20">
      <Container size="narrow">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-[#4A5878] dark:text-[#A9B6D3] hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all services</span>
        </Link>

        <div className="space-y-6">
          <Badge variant="default">{service.serviceType.replace('_', ' ')}</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1128] dark:text-[#F4F7FB]">
            {service.title}
          </h1>
          <p className="text-lg text-[#0EA5A4] dark:text-[#2DD4BF] font-medium">
            {service.tagline}
          </p>
          <p className="text-base sm:text-lg text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
            {service.summary}
          </p>

          <div className="p-4 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6] text-xs font-mono border border-[#1D4ED8]/20 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{service.scopingNote}</span>
          </div>
        </div>
      </Container>

      {/* Deep Dive Section */}
      <section className="bg-[#F4F7FB]/50 dark:bg-[#0F1A38]/50 py-16 border-y border-[#D8E0EE] dark:border-[#22305A]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Business Problem */}
            <Card className="p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                The Business Problem
              </h2>
              <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                {service.problemSolved}
              </p>
            </Card>

            {/* Expected Deliverables */}
            <Card className="p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                Standard Deliverables
              </h2>
              <ul className="space-y-3">
                {service.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#4A5878] dark:text-[#A9B6D3]">
                    <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
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
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-[#0A1128] dark:text-[#F4F7FB] mb-6">
              What We Build Under This Service
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.whatWeBuild.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] text-sm text-[#0A1128] dark:text-[#F4F7FB] flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] dark:text-[#3B82F6] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#4A5878] dark:text-[#A9B6D3] mb-4">
              Core Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.techFocus.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] text-sm font-semibold text-[#0A1128] dark:text-[#F4F7FB]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-8 border-t border-[#D8E0EE] dark:border-[#22305A] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                Ready to talk requirements?
              </h3>
              <p className="text-xs text-[#4A5878] dark:text-[#A9B6D3]">
                We'll review your scope and provide a transparent feasibility response.
              </p>
            </div>
            <Link href={`/contact?service=${service.serviceType}`}>
              <Button size="lg" variant="primary">
                Discuss Your Requirements
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
