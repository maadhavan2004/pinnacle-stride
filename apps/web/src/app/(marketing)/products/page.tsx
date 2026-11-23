import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Button, Badge } from '@ps/ui';
import { productsData } from '@ps/content';
import {
  CheckCircle2,
  Cpu,
  Database,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Terminal,
  Lightbulb,
  Search,
  FileText,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products — In-Development Software',
  description:
    'Explore StrideFlow Knowledge Engine, PinnacleStride’s flagship private RAG platform currently in active development.',
};

export default function ProductsPage() {
  // Retain the single product currently in development
  const activeProduct =
    productsData.find((p) => p.slug === 'stride-flow-rag' || p.productStatus === 'IN_DEVELOPMENT') ||
    productsData[0]!;

  return (
    <div className="py-12 sm:py-20 space-y-16">
      {/* Header */}
      <Container size="narrow">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 border border-primary/25 text-accent shadow-[0_0_12px_rgba(147,51,234,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>In-House Software Engineering</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text">
            Our Software Products
          </h1>
          <p className="text-xs sm:text-base text-text-muted leading-relaxed max-w-xl mx-auto pt-1">
            We build and operate independent software tools. Working on our own products gives us deep architectural discipline, performance standards, and end-user empathy.
          </p>
        </div>
      </Container>

      {/* Featured In-Development Product Showcase */}
      <Container>
        <div className="rounded-2xl border border-primary/25 bg-surface/80 backdrop-blur-md p-6 sm:p-10 lg:p-12 shadow-[0_0_30px_-5px_rgba(147,51,234,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: What it is, Problem it Solves, Target Users, and Expected Value */}
            <div className="lg:col-span-7 space-y-6">
              {/* Product Title & Tagline */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                  Flagship Product
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight">
                  {activeProduct.name}
                </h2>
                <p className="text-sm sm:text-base font-medium text-accent/90 leading-snug">
                  {activeProduct.tagline}
                </p>
              </div>

              {/* What the product is & does */}
              <div className="space-y-2 text-xs sm:text-sm text-text-muted leading-relaxed">
                <p>
                  <strong className="text-text font-medium">What it is:</strong> A private, self-hosted Retrieval-Augmented Generation (RAG) platform that connects to your internal technical documentation, repositories, PDFs, and architecture specs to provide fast, high-confidence semantic discovery without leaking confidential code or data to external third-party model providers.
                </p>
              </div>

              {/* Real-World Problem Solved */}
              <div className="p-4 rounded-xl bg-bg-subtle/80 border border-border/80 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-text font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-accent" />
                  The Problem It Solves:
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {activeProduct.problem}
                </p>
              </div>

              {/* How It Addresses The Problem */}
              <div className="space-y-2 text-xs text-text-muted leading-relaxed">
                <div className="text-[11px] font-mono uppercase tracking-wider text-text font-semibold">
                  How It Addresses the Challenge:
                </div>
                <p>
                  StrideFlow combines dense vector embeddings with sparse keyword search (hybrid search) powered by PostgreSQL and pgvector. Queries are matched across semantic intent and exact token matches, returning precise sentence-level source citations and confidence scores.
                </p>
              </div>

              {/* Target Users & Value Expected */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-bg-subtle/60 border border-border/70 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle font-semibold">
                    Target Users
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {activeProduct.targetUsers || 'Engineering leads, software architects, support engineers, and technical teams.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-bg-subtle/60 border border-border/70 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle font-semibold">
                    Expected Value
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Zero hallucination retrieval, complete data privacy with local model compatibility (Ollama/vLLM), and instant answers with verifiable citations.
                  </p>
                </div>
              </div>

              {/* Core Capabilities Checklist */}
              <div className="space-y-2.5 pt-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-text font-semibold">
                  Key Capabilities:
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {activeProduct.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-text-muted">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: In Development Status (Positioned on the Right on Desktop) & Visual Spec Card */}
            <div className="lg:col-span-5 flex flex-col gap-5 w-full">
              {/* Development Status Badge Header on Desktop */}
              <div className="flex items-center justify-between lg:justify-end gap-3 p-3 rounded-xl bg-surface border border-border">
                <span className="text-xs text-text-muted font-medium">Product Status:</span>
                <Badge variant="status-amber" size="md">
                  In Development
                </Badge>
              </div>

              {/* Interactive Cosmic Architectural Card */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-surface via-bg-subtle to-surface border border-primary/20 space-y-5 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 text-accent flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-text">StrideFlow Engine</div>
                      <div className="text-[10px] font-mono text-text-subtle">Hybrid RAG Stack</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active Sprint
                  </span>
                </div>

                {/* Architecture Visual Badges */}
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-surface border border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-accent" />
                      <span className="text-text font-mono text-[11px]">Vector Storage</span>
                    </div>
                    <span className="text-[10px] font-mono text-text-subtle">PostgreSQL + pgvector</span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface border border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-accent" />
                      <span className="text-text font-mono text-[11px]">Search Engine</span>
                    </div>
                    <span className="text-[10px] font-mono text-text-subtle">Dense + BM25 Reciprocal Fusion</span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface border border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-text font-mono text-[11px]">Guardrails</span>
                    </div>
                    <span className="text-[10px] font-mono text-text-subtle">Sentence-Level Citations</span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface border border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-accent" />
                      <span className="text-text font-mono text-[11px]">Privacy Mode</span>
                    </div>
                    <span className="text-[10px] font-mono text-text-subtle">Local LLM Compatible (Ollama)</span>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="pt-2">
                  <Link href="/contact" className="w-full block">
                    <Button size="md" variant="cosmic" className="w-full text-xs">
                      Join Early Access & Testing
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                  <p className="text-[10px] text-center text-text-subtle mt-2 font-mono">
                    Private previews scheduled on invitation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Suggest an Idea Card */}
      <Container size="narrow">
        <div className="p-6 sm:p-8 rounded-xl bg-surface/80 border border-border text-center space-y-3 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 text-accent flex items-center justify-center mx-auto">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-text">
            Have a tool or workflow bottleneck you want solved?
          </h2>
          <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
            If you encounter repeated operational bottlenecks in your work, tell us. We actively evaluate open-source and commercial product concepts to build in public.
          </p>
          <div className="pt-1">
            <Link href="/contact">
              <Button size="sm" variant="secondary" className="text-xs">
                Suggest a Product Concept
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
