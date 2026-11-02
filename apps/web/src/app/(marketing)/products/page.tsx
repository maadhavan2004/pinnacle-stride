import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Card, Badge, Button } from '@ps/ui';
import { productsData } from '@ps/content';
import { CheckCircle2, Clock, Lightbulb, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Software Products — In-House Tools & Open Infrastructure',
  description:
    'Explore PinnacleStride software products: StrideFlow Knowledge Engine, StrideGuard Sentinel, and Stride SchemaKit.',
};

export default function ProductsPage() {
  return (
    <div className="py-10 sm:py-16 space-y-12">
      {/* Header */}
      <Container size="narrow">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
            In-House Software
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
            Our Software Products.
          </h1>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-xl mx-auto pt-1">
            We are not just a client agency—we build and operate independent software tools. Working on our own products gives us deep empathy for architecture, maintainability, and end-user delight.
          </p>
        </div>
      </Container>

      {/* Products Listing */}
      <Container>
        <div className="space-y-6">
          {productsData.map((prod) => (
            <div
              key={prod.slug}
              className="p-6 sm:p-8 rounded-xl bg-surface border border-border shadow-xs flex flex-col lg:flex-row gap-8 items-start justify-between"
            >
              {/* Left Column: Product Information */}
              <div className="lg:max-w-xl space-y-4">
                <div className="flex items-center gap-2.5">
                  <Badge
                    variant={
                      prod.productStatus === 'LIVE'
                        ? 'status-green'
                        : prod.productStatus === 'IN_DEVELOPMENT'
                        ? 'status-amber'
                        : 'status-blue'
                    }
                    size="sm"
                  >
                    {prod.productStatus === 'IN_DEVELOPMENT'
                      ? 'In Development'
                      : prod.productStatus === 'COMING_SOON'
                      ? 'Coming Soon'
                      : prod.productStatus}
                  </Badge>
                  <span className="text-[10px] font-mono text-text-subtle">
                    Independent Product
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-text">
                  {prod.name}
                </h2>

                <p className="text-xs sm:text-sm font-medium text-primary">
                  {prod.tagline}
                </p>

                <p className="text-xs text-text-muted leading-relaxed">
                  {prod.bodyMd}
                </p>

                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle">
                    The Problem It Solves:
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed bg-bg-subtle p-3 rounded-lg border border-border">
                    {prod.problem}
                  </p>
                </div>

                {prod.targetUsers && (
                  <div className="text-xs text-text-subtle">
                    <span className="font-medium text-text">Target Users:</span>{' '}
                    {prod.targetUsers}
                  </div>
                )}
              </div>

              {/* Right Column: Features & Roadmap */}
              <div className="w-full lg:w-80 space-y-4 bg-bg-subtle/70 p-5 rounded-lg border border-border text-xs">
                <div>
                  <h3 className="text-[11px] font-mono uppercase tracking-wider text-text font-semibold mb-2">
                    Key Capabilities:
                  </h3>
                  <ul className="space-y-2">
                    {prod.features.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-border">
                  <h3 className="text-[11px] font-mono uppercase tracking-wider text-text font-semibold mb-2 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-primary" />
                    Development Roadmap:
                  </h3>
                  <div className="space-y-1.5">
                    {prod.roadmap.map((step, i) => (
                      <div key={i} className="text-xs text-text-muted pl-2 border-l border-primary/40 font-mono text-[11px]">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <Link href="/contact" className="w-full block">
                    <Button size="sm" variant="secondary" className="w-full text-xs">
                      Join Early Access List
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Suggest a Product Idea Section */}
      <Container size="narrow">
        <div className="p-6 sm:p-8 rounded-xl bg-surface border border-border text-center space-y-3 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-surface-hover border border-border text-primary flex items-center justify-center mx-auto">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-semibold text-text">
            Have an idea for a tool that should exist?
          </h2>
          <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
            If you encounter repeated operational bottlenecks in your work, tell us. We actively evaluate open-source and commercial product concepts to build in public.
          </p>
          <div className="pt-1">
            <Link href="/contact">
              <Button size="sm" variant="primary">
                Suggest an Idea
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
