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
  Terminal,
} from 'lucide-react';

export default function HomePage() {
  const featuredProjects = projectsData.filter((p) => p.isFeatured).slice(0, 3);
  const featuredProducts = productsData.filter((pr) => pr.isFeatured).slice(0, 3);

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-20 overflow-hidden">
      {/* 1. HERO SECTION (Linear / Vercel style) */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 flex items-center">
        <HeroPathAnimation />
        <Container>
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* Minimalist Micro-Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface border border-border text-text-muted mb-6 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>PinnacleStride Engineering</span>
              <span className="text-border">|</span>
              <span className="text-text-subtle">Build Beyond. Stride Ahead.</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-[1.15] mb-5">
              Turning bold ideas into{' '}
              <span className="text-text-muted font-normal">resilient software.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-sm sm:text-base text-text-muted max-w-xl leading-relaxed mb-8">
              A product-building technology startup that delivers custom web applications, grounded RAG architectures, and reproducible cloud infrastructure.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto">
                  Start a Project
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/projects" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Explore Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. THE THREE PILLARS */}
      <section className="relative">
        <Container>
          <SectionHeading
            eyebrow="Core Competencies"
            title="The Three Pillars of PinnacleStride"
            description="We combine the rigor of building our own independent software products with the discipline of engineering custom solutions for client partners."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pillar 1 */}
            <Link href="/services" className="group">
              <Card className="h-full flex flex-col justify-between p-6">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-surface-hover border border-border text-text flex items-center justify-center mb-5 group-hover:border-primary/50 transition-colors">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold mb-2 text-text group-hover:text-primary transition-colors">
                    Custom Digital Solutions
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-5">
                    Full-stack web applications, accessible marketing engines, and internal backoffices engineered with Next.js, NestJS, and PostgreSQL.
                  </p>
                </div>
                <div className="flex items-center text-xs font-medium text-text group-hover:text-primary transition-colors">
                  <span>Explore Services</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Card>
            </Link>

            {/* Pillar 2 */}
            <Link href="/services/genai-agentic-ai" className="group">
              <Card className="h-full flex flex-col justify-between p-6">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-surface-hover border border-border text-text flex items-center justify-center mb-5 group-hover:border-primary/50 transition-colors">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold mb-2 text-text group-hover:text-primary transition-colors">
                    AI & Intelligent Systems
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-5">
                    Grounded RAG assistants, autonomous multi-step agents, and predictive machine learning models with verifiable citations and guardrails.
                  </p>
                </div>
                <div className="flex items-center text-xs font-medium text-text group-hover:text-primary transition-colors">
                  <span>View AI Capabilities</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Card>
            </Link>

            {/* Pillar 3 */}
            <Link href="/products" className="group">
              <Card className="h-full flex flex-col justify-between p-6">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-surface-hover border border-border text-text flex items-center justify-center mb-5 group-hover:border-primary/50 transition-colors">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold mb-2 text-text group-hover:text-primary transition-colors">
                    Our Own Products
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-5">
                    We dogfood our engineering by conceiving, building, and operating independent SaaS tools and open-source infrastructure packages.
                  </p>
                </div>
                <div className="flex items-center text-xs font-medium text-text group-hover:text-primary transition-colors">
                  <span>Discover Products</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Card>
            </Link>
          </div>
        </Container>
      </section>

      {/* 3. FEATURED PRODUCTS (SOPHISTICATED SaaS CARDS) */}
      <section className="relative">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                In-House Software
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text mt-1">
                Featured Software Products
              </h2>
            </div>
            <Link href="/products" className="text-xs font-medium text-text-muted hover:text-text flex items-center gap-1 transition-colors">
              <span>View all products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProducts.map((prod) => (
              <Card key={prod.slug} className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge variant={prod.productStatus === 'LIVE' ? 'status-green' : 'status-amber'}>
                      {prod.productStatus === 'IN_DEVELOPMENT'
                        ? 'In Development'
                        : prod.productStatus === 'COMING_SOON'
                        ? 'Coming Soon'
                        : prod.productStatus}
                    </Badge>
                    <span className="text-[10px] font-mono text-text-subtle">
                      Independent
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-text mb-1.5">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-primary font-medium mb-3">
                    {prod.tagline}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed mb-5">
                    {prod.problem}
                  </p>

                  <div className="space-y-1.5 mb-5 pt-3 border-t border-border/60">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle">
                      Core Highlights:
                    </div>
                    {prod.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-text-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-text-subtle">
                    Status: {prod.productStatus.replace('_', ' ')}
                  </span>
                  <Link href="/products" className="font-medium text-text hover:text-primary transition-colors">
                    Learn more →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. FEATURED PROJECTS / PORTFOLIO */}
      <section className="relative bg-bg-subtle/60 py-14 sm:py-16 border-y border-border">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                Verified Case Studies
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text mt-1">
                Engineering Work
              </h2>
            </div>
            <Link href="/projects" className="text-xs font-medium text-text-muted hover:text-text flex items-center gap-1 transition-colors">
              <span>Browse full portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map((project) => (
              <Card key={project.slug} className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="portfolio">
                      {project.projectType === 'INTERNAL_PORTFOLIO'
                        ? 'Internal Project'
                        : project.projectType === 'INDEPENDENT_PRODUCT'
                        ? 'Product'
                        : 'Client Work'}
                    </Badge>
                    <span className="text-[10px] font-mono text-text-subtle">
                      {project.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-text mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center text-xs font-medium text-text hover:text-primary transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
            eyebrow="Open Standards"
            title="Engineered With Modern Foundations"
            description="We select proven technologies that we master and use daily—no vaporware or unverified hype."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technologyCategories.map((cat) => (
              <div
                key={cat.id}
                className="p-5 rounded-xl bg-surface border border-border space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-xs text-text">
                    {cat.name}
                  </h3>
                  <Terminal className="w-3.5 h-3.5 text-text-subtle" />
                </div>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  {cat.description}
                </p>
                <div className="space-y-1.5 pt-2 border-t border-border/60">
                  {cat.items.map((tech) => (
                    <div key={tech.name} className="flex items-baseline justify-between gap-2 text-xs">
                      <span className="font-mono text-[11px] font-medium text-text">
                        {tech.name}
                      </span>
                      <span className="text-[10px] text-text-subtle text-right truncate max-w-[160px]">
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
      <section className="relative bg-bg-subtle/50 py-14 sm:py-16 border-y border-border">
        <Container>
          <SectionHeading
            eyebrow="Methodology"
            title="A Transparent Five-Stage Process"
            description="From discovery to maintenance, our structured stages guarantee accountability and zero surprises."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
            {processStages.map((stage) => (
              <div
                key={stage.id}
                className="p-4 rounded-xl bg-surface border border-border flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-primary">
                      0{stage.step}
                    </span>
                    <span className="text-[10px] font-mono text-text-subtle">
                      {stage.duration}
                    </span>
                  </div>
                  <h3 className="font-semibold text-xs text-text mb-1.5">
                    {stage.title}
                  </h3>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    {stage.summary}
                  </p>
                </div>
                <div className="pt-2 border-t border-border/50 text-[10px] font-mono text-text-subtle truncate">
                  {stage.outputs[0]}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/how-we-work">
              <Button size="sm" variant="secondary" className="text-xs">
                Detailed Delivery Model & Maintenance Options
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="relative">
        <Container>
          <div className="rounded-2xl p-8 sm:p-12 bg-surface border border-border text-center flex flex-col items-center max-w-3xl mx-auto shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold mb-2">
              Start a Conversation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text mb-3">
              Have an idea worth building?
            </h2>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-lg mb-6">
              Whether you need a high-conversion marketing platform, a modular SaaS backoffice, or a grounded RAG intelligence assistant, we’re ready to discuss requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="md" variant="primary" className="w-full sm:w-auto">
                  Start a Project
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <a
                href="mailto:hello@pinnaclestride.com"
                className="text-xs text-text-muted hover:text-text transition-colors py-2 px-3"
              >
                Or email hello@pinnaclestride.com
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
