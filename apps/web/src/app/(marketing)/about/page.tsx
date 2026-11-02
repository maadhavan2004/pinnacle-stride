import React from 'react';
import type { Metadata } from 'next';
import { Container, Card, Badge, SectionHeading } from '@ps/ui';
import { companyOverview, teamMembersData } from '@ps/content';
import { Target, Compass, Users, Globe2, ShieldCheck, HeartHandshake, Zap, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Purpose, Team & Engineering Principles',
  description:
    'Learn about PinnacleStride: our mission, five core engineering values, remote-first distributed model, and the founding team.',
};

export default function AboutPage() {
  const valueIcons = [HeartHandshake, Target, Compass, Zap, Lock];

  return (
    <div className="flex flex-col gap-16 sm:gap-24 py-10 sm:py-16">
      {/* Intro Header */}
      <section>
        <Container size="narrow">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
              Our Identity
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
              Building Technology With Purpose.
            </h1>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-xl mx-auto pt-1">
              PinnacleStride is an independent, remote-first technology startup. We build and operate our own software products while partnering with ambitious businesses to engineer bespoke, high-performance digital systems.
            </p>
          </div>
        </Container>
      </section>

      {/* Vision & Mission Side-by-Side */}
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Vision */}
            <Card className="flex flex-col justify-between p-6 sm:p-8 space-y-4">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-surface-hover border border-border text-text flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-semibold text-text">
                  Our Vision
                </h2>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {companyOverview.vision}
                </p>
              </div>
            </Card>

            {/* Mission */}
            <Card className="flex flex-col justify-between p-6 sm:p-8 space-y-4">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-surface-hover border border-border text-text flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-semibold text-text">
                  Our Mission
                </h2>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {companyOverview.mission}
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Five Core Values Grid */}
      <section className="bg-bg-subtle/50 py-14 sm:py-16 border-y border-border">
        <Container>
          <SectionHeading
            eyebrow="Core Principles"
            title="The Values We Build By"
            description="Our non-negotiable standards that shape how we scope projects, write code, communicate, and deliver value."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companyOverview.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length]!;
              return (
                <div
                  key={v.title}
                  className="p-5 rounded-xl bg-surface border border-border space-y-2.5 shadow-xs"
                >
                  <div className="w-7 h-7 rounded-md bg-surface-hover border border-border text-text flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-semibold text-xs text-text">
                    {v.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}

            {/* Remote-First Commitment Card */}
            <div className="p-5 rounded-xl bg-surface border border-border space-y-2.5 shadow-xs">
              <div className="w-7 h-7 rounded-md bg-surface-hover border border-border text-primary flex items-center justify-center">
                <Globe2 className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-semibold text-xs text-text">
                Remote-First Discipline
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {companyOverview.remoteFirstStatement}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section id="team">
        <Container>
          <SectionHeading
            eyebrow="Founding Team"
            title="Meet the Engineers"
            description="A four-member core team with real responsibilities, technical craftsmanship, and shared accountability."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembersData.map((member) => (
              <Card key={member.fullName} className="flex flex-col justify-between p-5">
                <div>
                  {/* Minimalist Monogram Avatar */}
                  <div className="w-10 h-10 rounded-lg bg-surface-hover border border-border text-text flex items-center justify-center font-mono font-semibold text-xs mb-4">
                    {member.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>

                  <h3 className="font-semibold text-xs text-text">
                    {member.fullName}
                  </h3>
                  <div className="text-[11px] font-mono text-primary mb-2">
                    {member.roleTitle}
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-border space-y-1.5">
                  <div className="text-[10px] font-mono text-text-subtle">
                    Core Focus:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.interests.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-bg-subtle border border-border text-text-muted"
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
