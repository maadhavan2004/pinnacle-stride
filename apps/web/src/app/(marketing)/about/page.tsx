import React from 'react';
import type { Metadata } from 'next';
import { Container, Card, Badge, SectionHeading } from '@ps/ui';
import { companyOverview, teamMembersData } from '@ps/content';
import {
  Target,
  Compass,
  Users,
  Globe2,
  ShieldCheck,
  HeartHandshake,
  Zap,
  Lock,
  Sparkles,
  Cpu,
  Layers,
  Code2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About PinnacleStride — Purpose, Vision & Engineering Values',
  description:
    'Learn about PinnacleStride: our mission, five core engineering values, remote-first distributed model, and the founding team.',
};

export default function AboutPage() {
  const valueIcons = [HeartHandshake, Target, Compass, Zap, Lock];

  return (
    <div className="flex flex-col gap-20 sm:gap-28 py-12 sm:py-20 overflow-hidden relative">
      {/* Ambient Cosmic Background Accents */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-purple-600/12 via-violet-600/6 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* 1. HERO HEADER */}
      <section>
        <Container size="narrow">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 border border-primary/25 text-accent shadow-[0_0_12px_rgba(147,51,234,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Our Identity & Purpose</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-[1.15]">
              Building Technology <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-sky-400">
                With Purpose & Craftsmanship.
              </span>
            </h1>
            <p className="text-xs sm:text-base text-text-muted leading-relaxed max-w-2xl mx-auto pt-2">
              PinnacleStride is an independent, remote-first product engineering startup. We engineer our own software tools while partnering with ambitious businesses to architect custom, high-resilience digital systems.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. THE THREE PILLARS OF OUR APPROACH */}
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-surface/85 backdrop-blur-md border border-border hover:border-primary/40 transition-all duration-200 space-y-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 text-accent flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-text">Who We Are</h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                A tight-knit team of full-stack engineers and product architects. We believe that software should be built with strict type safety, open standards, and zero vendor lock-in.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-surface/85 backdrop-blur-md border border-border hover:border-primary/40 transition-all duration-200 space-y-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 text-accent flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-text">What We Aim to Achieve</h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                To replace bloated, fragile web systems with fast, deterministic applications and grounded AI tools that solve real operational bottlenecks for teams and users.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-surface/85 backdrop-blur-md border border-border hover:border-primary/40 transition-all duration-200 space-y-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 text-accent flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-text">Our Problem-Solving Approach</h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Honest technical scoping, continuous integration testing, and measurable delivery milestones. We don't overpromise or deploy unverified technology.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. VISION & MISSION CARDS */}
      <section className="relative">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-surface/90 via-surface/60 to-bg-subtle/80 border border-primary/25 backdrop-blur-md space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 text-accent flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-text tracking-tight">
                Our Vision
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {companyOverview.vision}
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-surface/90 via-surface/60 to-bg-subtle/80 border border-primary/25 backdrop-blur-md space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 text-accent flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-text tracking-tight">
                Our Mission
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {companyOverview.mission}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. FIVE CORE VALUES */}
      <section className="bg-bg-subtle/50 py-16 sm:py-20 border-y border-border relative">
        <Container>
          <SectionHeading
            eyebrow="Non-Negotiable Principles"
            title="The Values We Build By"
            description="Our standards that dictate how we scope projects, write code, communicate with partners, and deliver long-term value."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {companyOverview.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length]!;
              return (
                <div
                  key={v.title}
                  className="p-6 rounded-2xl bg-surface/80 backdrop-blur-md border border-border hover:border-primary/40 transition-all duration-200 space-y-3 shadow-xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 text-accent flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-text">
                    {v.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}

            {/* Remote-First Commitment Card */}
            <div className="p-6 rounded-2xl bg-surface/80 backdrop-blur-md border border-border hover:border-primary/40 transition-all duration-200 space-y-3 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/25 text-sky-400 flex items-center justify-center">
                <Globe2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-text">
                Remote-First Discipline
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {companyOverview.remoteFirstStatement}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. TEAM SECTION (AUTHENTIC VERIFIED FOUNDING TEAM) */}
      <section id="team">
        <Container>
          <SectionHeading
            eyebrow="Leadership & Engineers"
            title="Meet the Core Team"
            description="A four-member core engineering team with direct responsibilities, technical craftsmanship, and shared accountability."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {teamMembersData.map((member) => (
              <Card key={member.fullName} className="flex flex-col justify-between p-6 rounded-2xl bg-surface/85 backdrop-blur-md">
                <div className="space-y-3.5">
                  {/* Monogram Avatar with Cosmic Glow */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 text-text flex items-center justify-center font-mono font-bold text-sm shadow-[0_0_15px_rgba(147,51,234,0.15)]">
                    {member.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-text">
                      {member.fullName}
                    </h3>
                    <div className="text-xs font-mono text-accent mt-0.5">
                      {member.roleTitle}
                    </div>
                  </div>

                  <p className="text-xs text-text-muted leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle font-semibold">
                    Core Focus:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.interests.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-subtle border border-border text-text-subtle"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
