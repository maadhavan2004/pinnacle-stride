import React from 'react';
import type { Metadata } from 'next';
import { Container, Card, Badge, SectionHeading } from '@ps/ui';
import { companyOverview, teamMembersData } from '@ps/content';
import { Target, Compass, Users, Globe2, ShieldCheck, HeartHandshake, Zap, Lock, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Purpose, Team & Engineering Principles',
  description:
    'Learn about PinnacleStride: our mission, five core engineering values, remote-first distributed model, and the founding team.',
};

export default function AboutPage() {
  const valueIcons = [HeartHandshake, Target, Compass, Zap, Lock];

  return (
    <div className="flex flex-col gap-20 sm:gap-28 py-12 sm:py-20">
      {/* Intro Header */}
      <section>
        <Container size="narrow">
          <div className="text-center space-y-4">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#0EA5A4] dark:text-[#2DD4BF] font-semibold">
              Our Identity & Purpose
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A1128] dark:text-[#F4F7FB]">
              Building Technology With Purpose.
            </h1>
            <p className="text-base sm:text-lg text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed max-w-2xl mx-auto pt-2">
              PinnacleStride is an independent, remote-first technology startup. We build and operate our own software products while partnering with ambitious businesses to engineer bespoke, high-performance digital systems.
            </p>
          </div>
        </Container>
      </section>

      {/* Vision & Mission Side-by-Side */}
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <Card className="flex flex-col justify-between border-l-4 border-l-[#1D4ED8] p-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6] flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                  Our Vision
                </h2>
                <p className="text-base text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                  {companyOverview.vision}
                </p>
              </div>
            </Card>

            {/* Mission */}
            <Card className="flex flex-col justify-between border-l-4 border-l-[#0EA5A4] p-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0EA5A4]/10 text-[#0EA5A4] dark:text-[#2DD4BF] flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                  Our Mission
                </h2>
                <p className="text-base text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                  {companyOverview.mission}
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Five Core Values Grid */}
      <section className="bg-[#F4F7FB]/50 dark:bg-[#0F1A38]/50 py-16 border-y border-[#D8E0EE] dark:border-[#22305A]">
        <Container>
          <SectionHeading
            eyebrow="What Guides Us"
            title="The Five Values We Build By"
            description="Our non-negotiable principles that shape how we scope projects, write code, communicate, and deliver value."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyOverview.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length]!;
              return (
                <div
                  key={v.title}
                  className="p-6 rounded-2xl bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0A1128] dark:text-[#F4F7FB]">
                    {v.title}
                  </h3>
                  <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}

            {/* Remote-First Commitment Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1D4ED8]/10 to-[#0EA5A4]/10 border border-[#1D4ED8]/30 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0EA5A4]/20 text-[#0EA5A4] dark:text-[#2DD4BF] flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#0A1128] dark:text-[#F4F7FB]">
                Remote-First Discipline
              </h3>
              <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
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
            eyebrow="The Builders"
            title="Meet the Founding Engineering Team"
            description="A four-member core team with real responsibilities, technical craftsmanship, and shared accountability."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembersData.map((member) => (
              <Card key={member.fullName} className="flex flex-col justify-between">
                <div>
                  {/* Avatar Placeholder with initials */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1D4ED8] to-[#0EA5A4] text-white flex items-center justify-center font-bold text-xl mb-4 shadow-md">
                    {member.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>

                  <h3 className="font-bold text-lg text-[#0A1128] dark:text-[#F4F7FB]">
                    {member.fullName}
                  </h3>
                  <div className="text-xs font-mono font-medium text-[#0EA5A4] dark:text-[#2DD4BF] mb-3">
                    {member.roleTitle}
                  </div>
                  <p className="text-xs text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D8E0EE] dark:border-[#22305A] space-y-2">
                  <div className="text-[11px] font-mono text-[#4A5878] dark:text-[#A9B6D3]">
                    Focus Areas:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.interests.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[#4A5878] dark:text-[#A9B6D3]"
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
