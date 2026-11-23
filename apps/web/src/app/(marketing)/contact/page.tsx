import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Container } from '@ps/ui';
import { ContactForm } from '@/features/contact/ContactForm';
import {
  Clock,
  ShieldCheck,
  Mail,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  FileCheck,
  Users2,
  MessageSquare,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Start a Project — Inquire & Consult With Us',
  description:
    'Start a conversation with PinnacleStride. Describe your requirements, timeline, and budget for your website, web application, or AI solution.',
};

export default function ContactPage() {
  const steps = [
    {
      num: '01',
      title: 'Step 1 – Request Received',
      desc: 'We receive your project enquiry and review the information you provide.',
      icon: Mail,
    },
    {
      num: '02',
      title: 'Step 2 – Understanding Your Requirements',
      desc: 'We evaluate your requirements and may contact you to clarify the project scope, technical expectations, and objectives.',
      icon: Users2,
    },
    {
      num: '03',
      title: 'Step 3 – Discussion and Project Proposal',
      desc: 'We discuss the proposed approach, feasibility, estimated timeline, and indicative cost.',
      icon: MessageSquare,
    },
    {
      num: '04',
      title: 'Step 4 – Project Confirmation',
      desc: 'Once both parties agree on the scope and terms, we proceed with the next steps.',
      icon: FileCheck,
    },
  ];

  return (
    <div className="py-12 sm:py-20 space-y-16 relative">
      {/* Ambient Cosmic Background Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-purple-600/12 via-violet-600/6 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Page Header */}
      <Container size="narrow">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 border border-primary/25 text-accent shadow-[0_0_12px_rgba(147,51,234,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Direct Client Consultation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text leading-[1.15]">
            Start a Project with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-sky-400">
              PinnacleStride.
            </span>
          </h1>
          <p className="text-xs sm:text-base text-text-muted leading-relaxed max-w-xl mx-auto pt-1">
            Tell us about your product vision, web platform, or custom engineering initiative. We will provide an honest project assessment and structured scope proposal.
          </p>
        </div>
      </Container>

      {/* 2-Column Section */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-12 text-center text-xs font-mono text-text-subtle">Loading inquiry form...</div>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Right Column: What Happens Next & Direct Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Dedicated "What Happens Next?" Stepper Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-surface/85 backdrop-blur-md border border-primary/25 space-y-5 shadow-sm">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-bold text-text uppercase tracking-wider font-mono">
                  What Happens Next?
                </h2>
              </div>

              <div className="space-y-4">
                {steps.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.num} className="flex items-start gap-3 text-xs">
                      <span className="w-6 h-6 rounded-lg bg-primary/10 border border-primary/20 text-accent font-mono font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {s.num}
                      </span>
                      <div className="space-y-0.5">
                        <div className="font-semibold text-text">{s.title}</div>
                        <div className="text-text-muted leading-relaxed text-[11px]">{s.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Rephrased "Honest Project Assessment" */}
              <div className="pt-4 border-t border-border space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-text">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Honest Project Assessment:</span>
                </div>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  We review your requirements honestly, evaluate the technical possibilities, identify potential challenges, and suggest a practical approach.
                </p>
              </div>

              {/* Confidentiality Commitment */}
              <div className="pt-3 border-t border-border space-y-1 text-xs text-text-muted">
                <div className="flex items-center gap-1.5 font-medium text-text">
                  <Lock className="w-3.5 h-3.5 text-accent" />
                  <span>Strict Confidentiality</span>
                </div>
                <p className="text-[11px] text-text-subtle leading-relaxed">
                  Your project specifications, concepts, and IP remain strictly private. Mutual NDAs are available upon request.
                </p>
              </div>

              {/* Direct Contact (Address removed, official email only) */}
              <div className="pt-4 border-t border-border space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle font-semibold">
                  Direct Contact
                </div>
                <div className="flex items-center gap-2 text-xs text-text font-mono">
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  <a
                    href="mailto:hello@pinnaclestride.com"
                    className="hover:text-primary transition-colors underline underline-offset-2"
                  >
                    hello@pinnaclestride.com
                  </a>
                </div>
              </div>
            </div>

            {/* Scoping Promise Box */}
            <div className="p-4 rounded-xl bg-bg-subtle/80 border border-border text-xs text-text-muted flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-text">Our Scoping Promise: </span>
                We never take on projects outside our core engineering competencies or promise delivery timelines we cannot guarantee.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
