export interface TechCategory {
  id: string;
  name: string;
  description: string;
  items: {
    name: string;
    description: string;
    badge?: string;
  }[];
}

export const technologyCategories: TechCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Modern, accessible, and fast user interfaces built with React and modern web standards.',
    items: [
      { name: 'Next.js 15 (App Router)', description: 'Server Components, SSR, SSG & On-Demand ISR' },
      { name: 'React 19', description: 'Declarative component architecture & modern hooks' },
      { name: 'TypeScript', description: 'Strict end-to-end type safety' },
      { name: 'Tailwind CSS', description: 'Design-token driven utility styling' },
      { name: 'Radix UI', description: 'Unstyled, accessible WCAG 2.2 AA primitives' },
      { name: 'Framer Motion', description: 'Performant, accessible micro-interactions' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Structured, modular monolith APIs engineered for resilience, testability, and speed.',
    items: [
      { name: 'NestJS', description: 'Enterprise modular framework with dependency injection' },
      { name: 'Fastify', description: 'High-throughput, low-overhead HTTP engine' },
      { name: 'Prisma ORM', description: 'Type-safe database client and versioned migrations' },
      { name: 'Zod', description: 'Schema validation shared seamlessly with the frontend' },
      { name: 'BullMQ', description: 'Resilient background job queues backed by Redis' },
      { name: 'Nodemailer', description: 'Reliable transactional email dispatch' },
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'Practical inference pipelines, classification systems, and statistical models.',
    items: [
      { name: 'Python', description: 'Standard language for machine learning workloads' },
      { name: 'FastAPI', description: 'High-performance model inference serving' },
      { name: 'PyTorch', description: 'Deep learning modeling and tensor computing' },
      { name: 'Scikit-Learn', description: 'Predictive analytics and tabular ML models' },
      { name: 'Pandas & NumPy', description: 'Robust data manipulation and array processing' },
    ],
  },
  {
    id: 'genai-agentic',
    name: 'GenAI & Agentic AI',
    description: 'State-of-the-art LLM architectures, grounded RAG, and deterministic multi-step agents.',
    items: [
      { name: 'LangChain & LlamaIndex', description: 'Frameworks for retrieval augmented generation (RAG)' },
      { name: 'Gemini & Claude & OpenAI', description: 'Frontier foundation model APIs' },
      { name: 'pgvector', description: 'Vector embeddings and hybrid search within PostgreSQL' },
      { name: 'Instructor / Zod Structured Outputs', description: 'Deterministic JSON validation for LLM responses' },
      { name: 'Agentic Tool Loops', description: 'Autonomous agents with sandboxed execution' },
    ],
  },
  {
    id: 'databases',
    name: 'Databases & Storage',
    description: 'ACID-compliant relational systems, high-speed caches, and S3-compatible object stores.',
    items: [
      { name: 'PostgreSQL 16', description: 'Primary relational system of record with JSONB & pg_trgm' },
      { name: 'Redis / Valkey', description: 'Sub-millisecond caching, rate-limiting & BullMQ queues' },
      { name: 'MinIO', description: 'High-performance, S3-compatible self-hosted object storage' },
    ],
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    description: 'Reproducible environments, hardened security, and automated delivery pipelines.',
    items: [
      { name: 'Docker & Docker Compose', description: 'Self-contained, reproducible container topology' },
      { name: 'Caddy', description: 'Modern reverse proxy with automatic TLS and HTTP/3' },
      { name: 'GitHub Actions', description: 'Automated CI/CD linting, testing, and deployment' },
      { name: 'Prometheus & Grafana', description: 'Application telemetry, uptime probes and metrics' },
      { name: 'Loki', description: 'Structured JSON log aggregation and search' },
    ],
  },
];
