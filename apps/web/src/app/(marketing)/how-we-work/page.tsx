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
    <div className="flex flex-col gap-20 sm:gap-28 py-12 sm:py-20">
      {/* Process Header */}
      <section>
        <Container size="narrow">
          <div className="text-center space-y-4">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#1D4ED8] dark:text-[#3B82F6] font-semibold">
              Delivery Methodology
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A1128] dark:text-[#F4F7FB]">
              How We Work: Transparent & Accountable.
            </h1>
            <p className="text-base sm:text-lg text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed max-w-2xl mx-auto pt-2">
              We eliminate guesswork with a five-stage delivery model rooted in asynchronous communication, strict type safety, and verifiable milestones.
            </p>
          </div>
        </Container>
      </section>

      {/* Five Stages in Full Detail */}
      <section>
        <Container>
          <div className="space-y-12">
            {processStages.map((stage) => (
              <div
                key={stage.id}
                className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] shadow-sm flex flex-col lg:flex-row gap-8 justify-between items-start"
              >
                <div className="lg:max-w-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6] font-mono font-bold text-base flex items-center justify-center">
                      0{stage.step}
                    </span>
                    <Badge variant="default">Stage {stage.step}</Badge>
                    <span className="text-xs font-mono text-[#0EA5A4] dark:text-[#2DD4BF] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {stage.duration}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                    {stage.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                    {stage.summary}
                  </p>

                  <div className="pt-2">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1128] dark:text-[#F4F7FB] mb-2.5">
                      Stage Activities:
                    </div>
                    <ul className="space-y-2">
                      {stage.activities.map((act, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A5878] dark:text-[#A9B6D3]">
                          <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tangible Artifacts Box */}
                <div className="w-full lg:w-80 p-6 rounded-2xl bg-[#F4F7FB] dark:bg-[#0A1128] border border-[#D8E0EE] dark:border-[#22305A] space-y-3">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0EA5A4] dark:text-[#2DD4BF] flex items-center gap-2">
                    <FileCode className="w-4 h-4" />
                    Tangible Outputs:
                  </div>
                  <ul className="space-y-2 text-xs text-[#0A1128] dark:text-[#F4F7FB]">
                    {stage.outputs.map((out, i) => (
                      <li key={i} className="pl-3 border-l-2 border-[#1D4ED8] py-1 font-mono">
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
      <section className="bg-[#F4F7FB]/50 dark:bg-[#0F1A38]/50 py-16 border-y border-[#D8E0EE] dark:border-[#22305A]">
        <Container>
          <SectionHeading
            eyebrow="Commercial Principles"
            title="Communication, Ownership & Maintenance"
            description="Clear expectations on how we collaborate, guarantee code ownership, and handle long-term operations."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="space-y-3 p-6">
              <div className="w-10 h-10 rounded-lg bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6] flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                Communication Cadence
              </h3>
              <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                {deliveryModel.cadence}
              </p>
            </Card>

            <Card className="space-y-3 p-6">
              <div className="w-10 h-10 rounded-lg bg-[#0EA5A4]/10 text-[#0EA5A4] dark:text-[#2DD4BF] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                100% Code Ownership
              </h3>
              <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                {deliveryModel.codeOwnership}
              </p>
            </Card>

            <Card className="space-y-3 p-6">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                Hosting Freedom
              </h3>
              <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
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
            eyebrow="Questions & Clarity"
            title="Frequently Asked Questions"
            description="Clear, honest answers to common questions regarding timelines, pricing, code ownership, and warranties."
          />

          <div className="space-y-4">
            {faqsData.map((faq) => (
              <div
                key={faq.question}
                className="p-6 rounded-2xl bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#0EA5A4] dark:text-[#2DD4BF]">
                  <span>Topic: {faq.topic}</span>
                </div>
                <h3 className="text-base font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                  {faq.question}
                </h3>
                <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed pt-1">
                  {faq.answerMd}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Discuss Your Specific Needs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
