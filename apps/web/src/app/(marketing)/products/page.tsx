import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Card, Badge, Button, SectionHeading } from '@ps/ui';
import { productsData } from '@ps/content';
import { CheckCircle2, Boxes, Clock, Lightbulb, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Software Products — In-House Tools & Open Infrastructure',
  description:
    'Explore PinnacleStride software products: StrideFlow Knowledge Engine, StrideGuard Sentinel, and Stride SchemaKit.',
};

export default function ProductsPage() {
  return (
    <div className="py-12 sm:py-20 space-y-16">
      {/* Header */}
      <Container size="narrow">
        <div className="text-center space-y-4">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#0EA5A4] dark:text-[#2DD4BF] font-semibold">
            In-House Software
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A1128] dark:text-[#F4F7FB]">
            Our Own Software Products.
          </h1>
          <p className="text-base sm:text-lg text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed max-w-2xl mx-auto pt-2">
            We are not just a client agency—we build and operate independent software tools. Working on our own products gives us deep empathy for architecture, maintainability, and end-user delight.
          </p>
        </div>
      </Container>

      {/* Products Listing */}
      <Container>
        <div className="space-y-12">
          {productsData.map((prod) => (
            <div
              key={prod.slug}
              className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] shadow-sm flex flex-col lg:flex-row gap-10 items-start justify-between"
            >
              {/* Left Column: Product Information */}
              <div className="lg:max-w-xl space-y-5">
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      prod.productStatus === 'LIVE'
                        ? 'status-green'
                        : prod.productStatus === 'IN_DEVELOPMENT'
                        ? 'status-amber'
                        : 'status-blue'
                    }
                  >
                    {prod.productStatus === 'IN_DEVELOPMENT'
                      ? 'In Development'
                      : prod.productStatus === 'COMING_SOON'
                      ? 'Coming Soon'
                      : prod.productStatus}
                  </Badge>
                  <span className="text-xs font-mono text-[#4A5878] dark:text-[#A9B6D3]">
                    Independent Product
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1128] dark:text-[#F4F7FB]">
                  {prod.name}
                </h2>

                <p className="text-sm sm:text-base font-medium text-[#0EA5A4] dark:text-[#2DD4BF]">
                  {prod.tagline}
                </p>

                <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                  {prod.bodyMd}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1128] dark:text-[#F4F7FB]">
                    The Problem It Solves:
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed bg-[#F4F7FB] dark:bg-[#0A1128] p-4 rounded-xl border border-[#D8E0EE] dark:border-[#22305A]">
                    {prod.problem}
                  </p>
                </div>

                {prod.targetUsers && (
                  <div className="text-xs text-[#4A5878] dark:text-[#A9B6D3]">
                    <span className="font-semibold text-[#0A1128] dark:text-[#F4F7FB]">Designed for:</span>{' '}
                    {prod.targetUsers}
                  </div>
                )}
              </div>

              {/* Right Column: Features & Roadmap */}
              <div className="w-full lg:w-96 space-y-6 bg-[#F4F7FB]/60 dark:bg-[#0F1A38]/60 p-6 rounded-2xl border border-[#D8E0EE] dark:border-[#22305A]">
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1128] dark:text-[#F4F7FB] mb-3">
                    Key Capabilities:
                  </h3>
                  <ul className="space-y-2.5">
                    {prod.features.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#4A5878] dark:text-[#A9B6D3]">
                        <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#D8E0EE] dark:border-[#22305A]">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1128] dark:text-[#F4F7FB] mb-3 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-[#3B82F6]" />
                    Development Roadmap:
                  </h3>
                  <div className="space-y-2">
                    {prod.roadmap.map((step, i) => (
                      <div key={i} className="text-xs text-[#4A5878] dark:text-[#A9B6D3] pl-2 border-l border-[#3B82F6]/40">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D8E0EE] dark:border-[#22305A]">
                  <Link href="/contact" className="w-full block">
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      Join Early Access List
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Suggest a Product Idea Section (FR-43) */}
      <Container size="narrow">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1D4ED8]/10 via-[#0EA5A4]/10 to-transparent border border-[#1D4ED8]/25 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#0EA5A4]/20 text-[#0EA5A4] dark:text-[#2DD4BF] flex items-center justify-center mx-auto">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
            Have an idea for a tool that should exist?
          </h2>
          <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] max-w-lg mx-auto">
            If you encounter repeated operational bottlenecks in your work, tell us. We actively evaluate open-source and commercial product concepts to build in public.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button size="md" variant="secondary">
                Suggest an Idea or Problem
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
