import React from 'react';
import Link from 'next/link';
import { HeroPathAnimation } from '@/components/HeroPathAnimation';
import { Container, Button, Card, Badge, SectionHeading } from '@ps/ui';
import {
  servicesData,
  processStages,
  technologyCategories,
  projectsData,
  productsData,
} from '@ps/content';
import {
  ArrowRight,
  Code2,
  Cpu,
  Boxes,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Layers,
  Terminal,
} from 'lucide-react';

export default function HomePage() {
  const featuredProjects = projectsData.filter((p) => p.isFeatured).slice(0, 3);
  const featuredProducts = productsData.filter((pr) => pr.isFeatured).slice(0, 3);

  return (
    <div className="flex flex-col gap-24 sm:gap-32 pb-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 pb-16 lg:pb-24 flex items-center">
        <HeroPathAnimation />
        <Container>
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Dual Strategic Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6] border border-[#1D4ED8]/25">
                <Boxes className="w-3.5 h-3.5" />
                Digital Products
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#0EA5A4]/10 text-[#0EA5A4] dark:text-[#2DD4BF] border border-[#0EA5A4]/25">
                <Sparkles className="w-3.5 h-3.5" />
                Intelligent Solutions
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0A1128] dark:text-[#F4F7FB] leading-[1.1] mb-6">
              We Turn Bold Ideas Into{' '}
              <span className="bg-gradient-to-r from-[#1D4ED8] via-[#3B82F6] to-[#2DD4BF] bg-clip-text text-transparent">
                Powerful Digital Solutions.
              </span>
            </h1>

            {/* Tagline & Supporting Paragraph */}
            <p className="text-lg sm:text-xl font-medium text-[#1D4ED8] dark:text-[#3B82F6] tracking-wide mb-3 font-mono">
              Build Beyond. Stride Ahead.
            </p>
            <p className="text-base sm:text-lg text-[#4A5878] dark:text-[#A9B6D3] max-w-2xl leading-relaxed mb-10">
              A product-building technology startup delivering custom web platforms, bespoke AI systems, and cloud infrastructure. We engineer with strict type safety, honest scoping, and transparent milestones.
            </p>

            {/* Two Primary CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto text-base">
                  Start a Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/projects" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base">
                  Explore Our Work
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. WHAT WE DO (THE THREE PILLARS) */}
      <section className="relative">
        <Container>
          <SectionHeading
            eyebrow="Core Competencies"
            title="The Three Pillars of PinnacleStride"
            description="We bridge the gap between building our own resilient software products and delivering high-impact engineering solutions for clients."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <Link href="/services" className="group">
              <Card className="h-full flex flex-col justify-between border-t-4 border-t-[#1D4ED8]">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6] flex items-center justify-center mb-6">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#0A1128] dark:text-[#F4F7FB] group-hover:text-[#1D4ED8] dark:group-hover:text-[#3B82F6] transition-colors">
                    Custom Digital Solutions
                  </h3>
                  <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed mb-6">
                    Full-stack web applications, accessible marketing platforms, and internal backoffices built with Next.js, NestJS, and PostgreSQL.
                  </p>
                </div>
                <div className="flex items-center text-sm font-semibold text-[#1D4ED8] dark:text-[#3B82F6] group-hover:translate-x-1 transition-transform">
                  <span>Explore Services</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Card>
            </Link>

            {/* Pillar 2 */}
            <Link href="/services/genai-agentic-ai" className="group">
              <Card className="h-full flex flex-col justify-between border-t-4 border-t-[#0EA5A4]">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0EA5A4]/10 text-[#0EA5A4] dark:text-[#2DD4BF] flex items-center justify-center mb-6">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#0A1128] dark:text-[#F4F7FB] group-hover:text-[#0EA5A4] dark:group-hover:text-[#2DD4BF] transition-colors">
                    AI & Intelligent Systems
                  </h3>
                  <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed mb-6">
                    Grounded RAG assistants, autonomous multi-step agents, and predictive machine learning models with verifiable citations and guardrails.
                  </p>
                </div>
                <div className="flex items-center text-sm font-semibold text-[#0EA5A4] dark:text-[#2DD4BF] group-hover:translate-x-1 transition-transform">
                  <span>View AI Capabilities</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Card>
            </Link>

            {/* Pillar 3 */}
            <Link href="/products" className="group">
              <Card className="h-full flex flex-col justify-between border-t-4 border-t-indigo-500">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                    <Boxes className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#0A1128] dark:text-[#F4F7FB] group-hover:text-indigo-500 transition-colors">
                    Our Own Products
                  </h3>
                  <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed mb-6">
                    We dogfood our engineering by conceiving, building, and operating independent SaaS tools and open-source infrastructure packages.
                  </p>
                </div>
                <div className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Discover Products</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Card>
            </Link>
          </div>
        </Container>
      </section>

      {/* 3. FEATURED PRODUCTS (WITH HONEST STATUS BADGES) */}
      <section className="relative">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#0EA5A4] dark:text-[#2DD4BF] font-semibold">
                In-House Innovation
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A1128] dark:text-[#F4F7FB] mt-2">
                Featured Software Products
              </h2>
            </div>
            <Link href="/products" className="text-sm font-semibold text-[#1D4ED8] dark:text-[#3B82F6] hover:underline flex items-center">
              View all products <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((prod) => (
              <Card key={prod.slug} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge variant={prod.productStatus === 'LIVE' ? 'status-green' : 'status-amber'}>
                      {prod.productStatus === 'IN_DEVELOPMENT'
                        ? 'In Development'
                        : prod.productStatus === 'COMING_SOON'
                        ? 'Coming Soon'
                        : prod.productStatus}
                    </Badge>
                    <span className="text-xs font-mono text-[#4A5878] dark:text-[#A9B6D3]">
                      Independent
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0A1128] dark:text-[#F4F7FB] mb-2">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#0EA5A4] dark:text-[#2DD4BF] font-medium mb-3">
                    {prod.tagline}
                  </p>
                  <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed mb-6">
                    {prod.problem}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-mono font-semibold uppercase text-[#0A1128] dark:text-[#F4F7FB]">
                      Key Highlights:
                    </div>
                    {prod.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#4A5878] dark:text-[#A9B6D3]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D8E0EE] dark:border-[#22305A] flex items-center justify-between">
                  <span className="text-xs text-[#4A5878] dark:text-[#A9B6D3]">
                    Status: <span className="font-semibold">{prod.productStatus.replace('_', ' ')}</span>
                  </span>
                  <Link href="/products" className="text-xs font-semibold text-[#1D4ED8] dark:text-[#3B82F6] hover:underline">
                    Learn more →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. FEATURED PROJECTS / PORTFOLIO */}
      <section className="relative bg-[#F4F7FB]/50 dark:bg-[#0F1A38]/50 py-16 border-y border-[#D8E0EE] dark:border-[#22305A]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#1D4ED8] dark:text-[#3B82F6] font-semibold">
                Proof of Capability
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A1128] dark:text-[#F4F7FB] mt-2">
                Featured Engineering Work
              </h2>
            </div>
            <Link href="/projects" className="text-sm font-semibold text-[#1D4ED8] dark:text-[#3B82F6] hover:underline flex items-center">
              Browse full portfolio <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.slug} className="flex flex-col justify-between">
                <div>
                  {/* Category & Project Type Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <Badge variant="portfolio">
                      {project.projectType === 'INTERNAL_PORTFOLIO'
                        ? 'Internal Project'
                        : project.projectType === 'INDEPENDENT_PRODUCT'
                        ? 'Product'
                        : 'Client Work'}
                    </Badge>
                    <span className="text-xs font-mono text-[#4A5878] dark:text-[#A9B6D3]">
                      {project.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0A1128] dark:text-[#F4F7FB] mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[#4A5878] dark:text-[#A9B6D3] border border-black/10 dark:border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D8E0EE] dark:border-[#22305A]">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-[#1D4ED8] dark:text-[#3B82F6] hover:underline"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. TECHNOLOGIES (6 CATEGORIES) */}
      <section className="relative">
        <Container>
          <SectionHeading
            eyebrow="Technology Foundation"
            title="Engineered With Modern Open Standards"
            description="We select proven, reliable technologies that we master and use daily—no vaporware or unverified hype."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologyCategories.map((cat) => (
              <div
                key={cat.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#0A1128] dark:text-[#F4F7FB]">
                    {cat.name}
                  </h3>
                  <Terminal className="w-4 h-4 text-[#0EA5A4] dark:text-[#2DD4BF]" />
                </div>
                <p className="text-xs text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed">
                  {cat.description}
                </p>
                <div className="space-y-2 pt-2 border-t border-[#D8E0EE]/60 dark:border-[#22305A]/60">
                  {cat.items.map((tech) => (
                    <div key={tech.name} className="flex items-baseline justify-between gap-2 text-xs">
                      <span className="font-semibold text-[#0A1128] dark:text-[#F4F7FB]">
                        {tech.name}
                      </span>
                      <span className="text-[11px] text-[#4A5878] dark:text-[#A9B6D3] text-right truncate">
                        {tech.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. HOW WE WORK (5-STAGE STEPPER) */}
      <section className="relative bg-[#F4F7FB]/40 dark:bg-[#0F1A38]/40 py-16 border-y border-[#D8E0EE] dark:border-[#22305A]">
        <Container>
          <SectionHeading
            eyebrow="Our Process"
            title="How We Work: Transparent & Disciplined"
            description="From initial discovery to long-term operational health, our five clear stages ensure zero surprises."
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative">
            {processStages.map((stage, idx) => (
              <div
                key={stage.id}
                className="relative p-5 rounded-2xl bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6] font-mono text-sm font-bold flex items-center justify-center">
                      0{stage.step}
                    </span>
                    <span className="text-[11px] font-mono text-[#0EA5A4] dark:text-[#2DD4BF]">
                      {stage.duration}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[#0A1128] dark:text-[#F4F7FB] mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed mb-4">
                    {stage.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D8E0EE] dark:border-[#22305A] text-[11px] text-[#4A5878] dark:text-[#A9B6D3] font-mono">
                  {stage.outputs[0]}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/how-we-work">
              <Button size="md" variant="secondary">
                Read Detailed Delivery Model & Maintenance Options
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* 7. FINAL CALL TO ACTION BANNER */}
      <section className="relative">
        <Container>
          <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#0A1128] via-[#131F42] to-[#0A1128] text-white border border-[#22305A] shadow-2xl text-center flex flex-col items-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <span className="inline-block text-xs font-mono uppercase tracking-wider text-[#2DD4BF] font-semibold">
                Ready to stride ahead?
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Have an idea worth building?
              </h2>
              <p className="text-base sm:text-lg text-[#A9B6D3] leading-relaxed">
                Whether you need a high-performance commercial website, a modular SaaS MVP, or a custom RAG intelligence system, let’s have a structured, candid conversation.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" className="w-full sm:w-auto text-base">
                    Start a Conversation →
                  </Button>
                </Link>
                <a
                  href="mailto:hello@pinnaclestride.com"
                  className="text-sm text-[#A9B6D3] hover:text-white transition-colors underline underline-offset-4"
                >
                  Or email hello@pinnaclestride.com
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
