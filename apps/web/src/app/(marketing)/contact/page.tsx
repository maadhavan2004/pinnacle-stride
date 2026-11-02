import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Container } from '@ps/ui';
import { ContactForm } from '@/features/contact/ContactForm';
import { Clock, ShieldCheck, Mail, MapPin, CheckCircle2, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Start a Project — Inquire & Consult With Us',
  description:
    'Start a conversation with PinnacleStride. Describe your requirements, timeline, and budget for your website, web application, or AI solution.',
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <Container size="narrow">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-text-subtle font-semibold">
            Inquiry & Consultation
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text">
            Start a project with PinnacleStride.
          </h1>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-xl mx-auto">
            Tell us about your product vision, web platform, or AI initiative. We will assess technical feasibility and respond with a structured initial assessment.
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

          {/* Right Column: Reassurance & Direct Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
            {/* Reassurance Card */}
            <div className="p-6 rounded-xl bg-surface border border-border space-y-5 shadow-xs">
              <h2 className="text-sm font-semibold text-text flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                What happens next?
              </h2>

              <ul className="space-y-3.5 text-xs text-text-muted">
                <li className="flex items-start gap-3">
                  <Clock className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-text">Rapid review: </span>
                    We inspect every submission and reply within <span className="font-medium text-text">2 business days</span>.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-text">Candid feasibility: </span>
                    If technical scope aligns with our strengths, we schedule a 30-minute discovery session to map architecture.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Lock className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-text">Confidentiality: </span>
                    Your requirements, concepts, and IP remain strictly confidential. Mutual NDAs are available upon request.
                  </div>
                </li>
              </ul>

              <div className="pt-4 border-t border-border space-y-2.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-text-subtle font-medium">
                  Direct Contact
                </div>
                <div className="flex items-center gap-2 text-xs text-text">
                  <Mail className="w-3.5 h-3.5 text-text-subtle" />
                  <a href="mailto:hello@pinnaclestride.com" className="hover:text-primary font-mono transition-colors">
                    hello@pinnaclestride.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <MapPin className="w-3.5 h-3.5 text-text-subtle" />
                  <span>Remote-First · Timezone: IST (UTC+5:30)</span>
                </div>
              </div>
            </div>

            {/* Scoping Promise Box */}
            <div className="p-4 rounded-xl bg-bg-subtle border border-border text-xs text-text-muted flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-text-subtle shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-text">Our Scoping Promise: </span>
                We never take on projects outside our core competencies or overpromise delivery timelines.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
