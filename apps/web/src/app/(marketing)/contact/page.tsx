import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Container, Card, Badge } from '@ps/ui';
import { ContactForm } from '@/features/contact/ContactForm';
import { Clock, ShieldCheck, Mail, MapPin, CheckCircle2, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Start a Project — Inquire & Consult With Us',
  description:
    'Start a conversation with PinnacleStride. Describe your requirements, timeline, and budget for your website, web application, or AI solution.',
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20 space-y-16">
      {/* Page Header */}
      <Container size="narrow">
        <div className="text-center space-y-4">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#1D4ED8] dark:text-[#3B82F6] font-semibold">
            Let's Collaborate
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A1128] dark:text-[#F4F7FB]">
            Start a Project with PinnacleStride.
          </h1>
          <p className="text-base sm:text-lg text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed max-w-2xl mx-auto pt-2">
            Tell us about your product vision, business website, or AI initiative. We will assess technical feasibility and respond with a structured initial assessment.
          </p>
        </div>
      </Container>

      {/* 2-Column Section */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-12 text-center text-sm font-mono">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Right Column: Reassurance & Direct Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            {/* Reassurance Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F7FB]/70 dark:bg-[#131F42]/70 border border-[#D8E0EE] dark:border-[#22305A] space-y-6">
              <h2 className="text-xl font-bold text-[#0A1128] dark:text-[#F4F7FB] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0EA5A4] dark:text-[#2DD4BF]" />
                What Happens Next?
              </h2>

              <ul className="space-y-4 text-xs sm:text-sm text-[#4A5878] dark:text-[#A9B6D3]">
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#1D4ED8] dark:text-[#3B82F6] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0A1128] dark:text-[#F4F7FB]">Rapid Assessment: </span>
                    We review every submission and reply within <span className="font-semibold text-[#0A1128] dark:text-[#F4F7FB]">2 business days</span>.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0A1128] dark:text-[#F4F7FB]">Candid Feasibility: </span>
                    If our technical strengths match your needs, we schedule a 30-minute discovery call to map scope and architecture.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-[#0EA5A4] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0A1128] dark:text-[#F4F7FB]">Confidentiality: </span>
                    Your requirements, business models, and trade ideas remain strictly confidential. We are glad to sign a mutual NDA before technical reviews.
                  </div>
                </li>
              </ul>

              <div className="pt-4 border-t border-[#D8E0EE] dark:border-[#22305A] space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1128] dark:text-[#F4F7FB]">
                  Prefer Direct Email?
                </div>
                <div className="flex items-center gap-2 text-sm text-[#0A1128] dark:text-[#F4F7FB]">
                  <Mail className="w-4 h-4 text-[#1D4ED8] dark:text-[#3B82F6]" />
                  <a href="mailto:hello@pinnaclestride.com" className="hover:underline font-mono text-xs sm:text-sm">
                    hello@pinnaclestride.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#4A5878] dark:text-[#A9B6D3]">
                  <MapPin className="w-4 h-4 text-[#0EA5A4] dark:text-[#2DD4BF]" />
                  <span>Remote-First Team · Timezone: IST (UTC+5:30)</span>
                </div>
              </div>
            </div>

            {/* Scoping Promise Box */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0A1128] border border-[#D8E0EE] dark:border-[#22305A] text-xs text-[#4A5878] dark:text-[#A9B6D3] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#1D4ED8] dark:text-[#3B82F6] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#0A1128] dark:text-[#F4F7FB]">Our Scoping Promise: </span>
                We never take on projects outside our core competencies or overpromise delivery timelines.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
