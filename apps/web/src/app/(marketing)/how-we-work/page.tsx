import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Card, Button, SectionHeading } from '@ps/ui';
import { processStages, deliveryModel, faqsData } from '@ps/content';
import { InteractiveProcessStages } from '@/components/InteractiveProcessStages';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  MessageSquare,
  Terminal,
  FileCode,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How We Work — The 5-Stage Engineering Process',
  description:
    'Our transparent, disciplined five-stage delivery process from discovery to long-term maintenance. No vendor lock-in, full code ownership.',
};

export default function HowWeWorkPage() {
  return (
    <div className="flex flex-col gap-16 sm:gap-24 py-12 sm:py-20 relative">
      {/* Ambient Cosmic Background Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-purple-600/12 via-violet-600/6 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Process Header */}
      <section>
        <Container size="narrow">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 border border-primary/25 text-accent shadow-[0_0_12px_rgba(147,51,234,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Transparent Delivery Methodology</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text leading-[1.15]">
              How We Work: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-sky-400">
                The Automated Project Journey.
              </span>
            </h1>
            <p className="text-xs sm:text-base text-text-muted leading-relaxed max-w-xl mx-auto pt-1">
              Watch how we engineer concepts into production-ready digital solutions. Follow the sequential construction from Discovery to Launch with verifiable milestone accountability.
            </p>
          </div>
        </Container>
      </section>

      {/* Interactive Stage-Based Stepper */}
      <section>
        <Container>
          <InteractiveProcessStages stages={processStages} />
        </Container>
      </section>

      {/* Delivery Model & Code Ownership Commitments */}
      <section className="bg-bg-subtle/50 py-16 sm:py-20 border-y border-border relative">
        <Container>
          <SectionHeading
            eyebrow="Commercial Principles"
            title="Communication, Ownership & Maintenance"
            description="Clear expectations on how we collaborate, guarantee code ownership, and handle long-term operations."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="space-y-3 p-6 rounded-2xl bg-surface/85 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 text-accent flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-text">
                Communication Cadence
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {deliveryModel.cadence}
              </p>
            </Card>

            <Card className="space-y-3 p-6 rounded-2xl bg-surface/85 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-text">
                100% Code Ownership
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {deliveryModel.codeOwnership}
              </p>
            </Card>

            <Card className="space-y-3 p-6 rounded-2xl bg-surface/85 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-400 flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-text">
                Hosting Freedom
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {deliveryModel.hostingFreedom}
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Frequently Asked Questions */}
      <section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="Clarity & Honesty"
            title="Frequently Asked Questions"
            description="Clear answers regarding timelines, pricing ranges, code ownership, and long-term maintenance."
          />

          <div className="space-y-3.5">
            {faqsData.map((faq) => (
              <div
                key={faq.question}
                className="p-6 rounded-2xl bg-surface/85 backdrop-blur-md border border-border space-y-2 shadow-xs"
              >
                <div className="text-[10px] font-mono text-accent uppercase tracking-wider font-semibold">
                  Topic: {faq.topic}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-text">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed pt-0.5">
                  {faq.answerMd}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact">
              <Button size="md" variant="cosmic">
                Discuss Your Requirements
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
