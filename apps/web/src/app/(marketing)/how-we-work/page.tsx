import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Card, Badge, Button, SectionHeading } from '@ps/ui';
import { processStages, deliveryModel, faqsData } from '@ps/content';
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, MessageSquare, Terminal, FileCode } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How We Work — The 5-Stage Engineering Process',
  description:
    'Our transparent, disciplined five-stage delivery process from discovery to long-term maintenance. No vendor lock-in, full code ownership.',
};

export default function HowWeWorkPage() {
  return (
    <div className="flex flex-col gap-16 sm:gap-24 py-10 sm:py-16">
      {/* Process Header */}
      <section>
        <Container size="narrow">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
              Delivery Methodology
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
              How We Work: Transparent & Accountable.
            </h1>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-xl mx-auto pt-1">
              We eliminate guesswork with a five-stage delivery model rooted in asynchronous communication, strict type safety, and verifiable milestones.
            </p>
          </div>
        </Container>
      </section>

      {/* Five Stages in Full Detail */}
      <section>
        <Container>
          <div className="space-y-6">
            {processStages.map((stage) => (
              <div
                key={stage.id}
                className="p-6 sm:p-8 rounded-xl bg-surface border border-border shadow-xs flex flex-col lg:flex-row gap-6 justify-between items-start"
              >
                <div className="lg:max-w-xl space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-surface-hover border border-border text-text font-mono font-bold text-xs flex items-center justify-center">
                      0{stage.step}
                    </span>
                    <Badge variant="default">Stage {stage.step}</Badge>
                    <span className="text-[11px] font-mono text-text-subtle flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {stage.duration}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-text">
                    {stage.title}
                  </h2>

                  <p className="text-xs text-text-muted leading-relaxed">
                    {stage.summary}
                  </p>

                  <div className="pt-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle mb-2">
                      Stage Activities:
                    </div>
                    <ul className="space-y-1.5">
                      {stage.activities.map((act, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tangible Artifacts Box */}
                <div className="w-full lg:w-72 p-4 rounded-lg bg-bg-subtle border border-border space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5" />
                    Tangible Outputs:
                  </div>
                  <ul className="space-y-1.5 text-xs text-text">
                    {stage.outputs.map((out, i) => (
                      <li key={i} className="pl-2 border-l border-primary/50 text-[11px] font-mono">
                        {out}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Delivery Model & Code Ownership Commitments */}
      <section className="bg-bg-subtle/50 py-14 sm:py-16 border-y border-border">
        <Container>
          <SectionHeading
            eyebrow="Commercial Principles"
            title="Communication, Ownership & Maintenance"
            description="Clear expectations on how we collaborate, guarantee code ownership, and handle long-term operations."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="space-y-2.5 p-5">
              <div className="w-8 h-8 rounded-lg bg-surface-hover border border-border text-text flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-text">
                Communication Cadence
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {deliveryModel.cadence}
              </p>
            </Card>

            <Card className="space-y-2.5 p-5">
              <div className="w-8 h-8 rounded-lg bg-surface-hover border border-border text-text flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="text-sm font-semibold text-text">
                100% Code Ownership
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {deliveryModel.codeOwnership}
              </p>
            </Card>

            <Card className="space-y-2.5 p-5">
              <div className="w-8 h-8 rounded-lg bg-surface-hover border border-border text-text flex items-center justify-center">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-text">
                Hosting Freedom
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
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
            eyebrow="Clarity"
            title="Frequently Asked Questions"
            description="Clear, honest answers to common questions regarding timelines, pricing, code ownership, and warranties."
          />

          <div className="space-y-3">
            {faqsData.map((faq) => (
              <div
                key={faq.question}
                className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-xs"
              >
                <div className="text-[10px] font-mono text-primary">
                  Topic: {faq.topic}
                </div>
                <h3 className="text-sm font-semibold text-text">
                  {faq.question}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed pt-0.5">
                  {faq.answerMd}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/contact">
              <Button size="md" variant="primary">
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
