import { Project } from '@ps/schemas';

export const projectsData: Project[] = [
  {
    slug: 'internal-knowledge-rag-assistant',
    title: 'Enterprise Internal Knowledge & Document Assistant',
    summary:
      'A grounded Retrieval-Augmented Generation (RAG) assistant indexing technical documentation, PDFs, and internal specs with source citations and guardrails.',
    projectType: 'INTERNAL_PORTFOLIO',
    category: 'GENAI_AGENTIC',
    overview:
      'Developed as an internal PinnacleStride engineering benchmark to test deterministic LLM retrieval and hallucination guardrails over complex technical documentation.',
    problem:
      'Engineers and project managers spend hours sifting through fragmented architectural specs, API documentation, and changelogs. Traditional full-text keyword searches fail to comprehend semantic developer queries.',
    solution:
      'We built an end-to-end RAG architecture combining dense vector embeddings with sparse keyword search (hybrid search) powered by PostgreSQL and pgvector, orchestrated with strict schema validation.',
    features: [
      'Document ingestion pipeline supporting PDF, Markdown, and OpenAPI specs',
      'Hybrid semantic + keyword retrieval with reciprocal rank fusion (RRF)',
      'Deterministic output formatting via Zod schema enforcement',
      'Exact sentence-level source citations and confidence scores',
      'Local privacy mode preventing external model data sharing',
    ],
    contribution:
      'Engineered the chunking strategy, vector ingestion pipeline, REST API endpoints with Fastify, and the responsive chat UI in Next.js.',
    results: null, // Per §1.9 and FR-53: verified outcomes only; NULL when internal benchmark without commercial metric
    clientName: null,
    liveUrl: 'https://demo.pinnaclestride.com/knowledge-assistant',
    repoUrl: 'https://github.com/pinnaclestride/rag-doc-assistant',
    technologies: ['Next.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'pgvector', 'Tailwind CSS'],
    isFeatured: true,
    status: 'PUBLISHED',
    sortOrder: 1,
  },
  {
    slug: 'modular-crm-backoffice-portal',
    title: 'Modular Operations & Lead Management Backoffice',
    summary:
      'A full-stack administrative platform featuring role-based access control, real-time inquiry triage, audit logging, and automated CSV export pipelines.',
    projectType: 'INTERNAL_PORTFOLIO',
    category: 'FULL_STACK_APP',
    overview:
      'Designed and implemented to serve as PinnacleStride’s operational backoffice for lead management, team coordination, and system governance.',
    problem:
      'Early-stage teams frequently rely on third-party SaaS tools with expensive per-seat pricing, opaque security postures, and disconnected data silos.',
    solution:
      'Engineered an open-source, self-hosted operations portal with strict role hierarchy (Owner, Editor, Viewer), cryptographic audit trails, and double-submit CSRF protection.',
    features: [
      'JWT session management with Argon2id hashing and sliding refresh tokens',
      'Time-based One-Time Password (TOTP) two-factor authentication',
      'Fast, URL-state-driven inquiry filtering, status transitions, and note logging',
      'Streaming CSV export respecting active filter queries',
      'Tamper-evident append-only audit logging for all mutations',
    ],
    contribution:
      'Designed the relational database schema in PostgreSQL, implemented NestJS controller guards, and built the admin UI interface.',
    results: null,
    clientName: null,
    liveUrl: 'https://demo.pinnaclestride.com/admin',
    repoUrl: 'https://github.com/pinnaclestride/operations-portal',
    technologies: ['NestJS', 'Next.js', 'Prisma', 'PostgreSQL', 'Radix UI', 'Tailwind CSS'],
    isFeatured: true,
    status: 'PUBLISHED',
    sortOrder: 2,
  },
  {
    slug: 'automated-telemetry-monitoring-harness',
    title: 'Automated Container Health & Telemetry Stack',
    summary:
      'Self-hosted observability harness featuring Caddy reverse proxy, Prometheus metrics scraping, Loki log aggregation, and Grafana alert dashboards.',
    projectType: 'INTERNAL_PORTFOLIO',
    category: 'EXPERIMENTAL',
    overview:
      'A turnkey infrastructure prototype designed to provide enterprise-grade observability without recurring SaaS monitoring costs.',
    problem:
      'Managing multiple micro-services or modular apps on modest cloud VPS instances often leads to undetected memory leaks, silent downtime, and blind debugging.',
    solution:
      'Packaged a unified Docker Compose topology orchestrating Caddy TLS termination, Prometheus node/API exporters, structured JSON log streaming into Loki, and pre-configured Grafana dashboards.',
    features: [
      'Automatic Let’s Encrypt certificate renewal via Caddy with HTTP/3 support',
      'Structured JSON request ID logging propagated across HTTP boundaries',
      'Real-time threshold alerting for API p95 latency and queue backlogs',
      'Automated nightly database backup snapshots with restore verification scripts',
    ],
    contribution:
      'Configured container compose definitions, Caddy security headers, and Prometheus alert metric rules.',
    results: null,
    clientName: null,
    liveUrl: null,
    repoUrl: 'https://github.com/pinnaclestride/infra-telemetry-harness',
    technologies: ['Docker', 'Docker Compose', 'Caddy', 'Prometheus', 'Grafana', 'Loki'],
    isFeatured: true,
    status: 'PUBLISHED',
    sortOrder: 3,
  },
  {
    slug: 'high-conversion-business-portfolio-engine',
    title: 'Accessible High-Performance Commercial Web Engine',
    summary:
      'A sub-second loading web platform achieving 98+ Lighthouse scores across performance, accessibility, best practices, and SEO.',
    projectType: 'INTERNAL_PORTFOLIO',
    category: 'BUSINESS_WEBSITE',
    overview:
      'The architecture that powers modern web engagements at PinnacleStride, built with Next.js App Router and Server Components.',
    problem:
      'Commercial websites with heavy client-side JavaScript suffer high bounce rates on mobile networks and fail WCAG accessibility compliance.',
    solution:
      'Created a zero-bloat Server Component architecture with progressive enhancement, accessible Radix primitives, and fluid typography.',
    features: [
      'Zero layout shift (CLS < 0.05) with explicit image dimensions',
      'Dynamic metadata, Open Graph cards, and JSON-LD schema generation',
      'Full keyboard operability and visible high-contrast focus rings',
      'Proof-of-work spam protection replacing intrusive Google reCAPTCHA',
    ],
    contribution:
      'Architected the design tokens, fluid CSS scaling, and lightweight client hydration boundary.',
    results: null,
    clientName: null,
    liveUrl: 'https://pinnaclestride.com',
    repoUrl: 'https://github.com/pinnaclestride/pinnaclestride-web',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Lucide Icons'],
    isFeatured: false,
    status: 'PUBLISHED',
    sortOrder: 4,
  },
];
