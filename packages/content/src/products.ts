import { Product } from '@ps/schemas';

export const productsData: Product[] = [
  {
    slug: 'stride-flow-rag',
    name: 'StrideFlow Knowledge Engine',
    tagline: 'Self-hosted RAG platform turning internal company specs into high-confidence queryable knowledge.',
    problem:
      'Growing engineering teams waste countless hours manually searching across scattered Notion docs, PDFs, Slack threads, and GitHub repositories without unified citations.',
    targetUsers: 'Technical teams, engineering leads, support specialists, and compliance managers.',
    features: [
      'Automated multi-source document ingestion and incremental vector indexing',
      'Hybrid semantic vector + BM25 keyword search powered by PostgreSQL and pgvector',
      'Exact sentence-level source citations and verification confidence scoring',
      'Zero-retention private mode compatible with local LLMs (Ollama / vLLM)',
      'Enterprise role-based document access controls',
    ],
    roadmap: [
      'Phase 1: CLI ingestion and PostgreSQL pgvector integration (Completed)',
      'Phase 2: Next.js interactive query interface and multi-document comparisons (Current)',
      'Phase 3: Automated Slack / Discord bot connectors and webhook dispatch',
    ],
    bodyMd:
      'StrideFlow Knowledge Engine is PinnacleStride’s flagship internal product, engineered to provide high-fidelity semantic discovery over private corporate knowledge without leaking confidential data to public model providers.',
    productStatus: 'IN_DEVELOPMENT',
    externalUrl: null,
    demoUrl: null,
    isFeatured: true,
    status: 'PUBLISHED',
  },
  {
    slug: 'stride-guard-telemetry',
    name: 'StrideGuard Sentinel',
    tagline: 'Lightweight zero-dependency server health monitor and automated backup validator.',
    problem:
      'Small engineering teams running on independent VPS hosts lack unified alerting and regularly neglect backup restoration drills until a disaster occurs.',
    targetUsers: 'Developers, indie founders, and sysadmins managing self-hosted infrastructure.',
    features: [
      'Single-binary agent collecting container metrics with minimal CPU and memory overhead',
      'Automated daily database snapshot verification in isolated test containers',
      'Discord, Slack, and email alert dispatch upon latency threshold breaches',
      'TLS certificate expiry monitoring with automatic early warning',
    ],
    roadmap: [
      'Phase 1: Architecture specification and prototype test harness (Completed)',
      'Phase 2: Docker health probe daemon and email dispatcher (In Progress)',
      'Phase 3: Public beta release and hosted telemetry dashboard',
    ],
    bodyMd:
      'StrideGuard Sentinel gives engineering teams peace of mind by continuously verifying that database backups can be restored and that services remain healthy.',
    productStatus: 'COMING_SOON',
    externalUrl: null,
    demoUrl: null,
    isFeatured: true,
    status: 'PUBLISHED',
  },
  {
    slug: 'stride-schema-kit',
    name: 'Stride SchemaKit',
    tagline: 'Shared type-safe validation and contract tooling for TypeScript monorepos.',
    problem:
      'Keeping API DTOs, frontend forms, and database models in sync across separate applications often leads to schema drift and subtle production runtime bugs.',
    targetUsers: 'Full-stack TypeScript engineers working in monorepo environments.',
    features: [
      'Bidirectional code-generation from Zod schemas to OpenAPI 3.1 and TypeScript interfaces',
      'Pre-built RFC 9457 error formatting serializer',
      'Zero-dependency form validation helpers for React Hook Form',
    ],
    roadmap: [
      'Phase 1: Core validator extraction from PinnacleStride monorepo (In Progress)',
      'Phase 2: Open-source package publication on npm',
    ],
    bodyMd:
      'Stride SchemaKit standardises input validation and error responses across both client and server applications.',
    productStatus: 'IN_DEVELOPMENT',
    externalUrl: null,
    demoUrl: null,
    isFeatured: false,
    status: 'PUBLISHED',
  },
];
