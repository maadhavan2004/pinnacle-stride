import { ServiceType } from '@ps/schemas';

export interface ServiceItem {
  slug: string;
  serviceType: ServiceType;
  title: string;
  tagline: string;
  summary: string;
  problemSolved: string;
  whatWeBuild: string[];
  deliverables: string[];
  techFocus: string[];
  scopingNote: string;
}

export const servicesData: ServiceItem[] = [
  {
    slug: 'websites-business-solutions',
    serviceType: 'BUSINESS_WEBSITE',
    title: 'Websites & Business Solutions',
    tagline: 'High-performance, accessible, search-optimised websites engineered for measurable business conversion.',
    summary:
      'We craft tailored digital front-doors, portals, and lead engines using modern web architectures that load in milliseconds, respect accessibility, and convert qualified visitors.',
    problemSolved:
      'Off-the-shelf templates and bloated site-builders often suffer from slow speeds, poor SEO rankings, generic design, and high maintenance fragility. Businesses lose high-intent leads because of slow initial loads and unclear value journeys.',
    whatWeBuild: [
      'High-performance marketing & commercial websites',
      'Lead capture funnels with privacy-first analytics and spam protection',
      'Component-driven CMS architectures for autonomous team publishing',
      'Documentation hubs, landing suites, and corporate portals',
    ],
    deliverables: [
      'Sub-2-second page loads with 90+ Lighthouse scores',
      'Responsive design across mobile (320px) to ultra-wide desktop',
      'Integrated SEO metadata, sitemaps, and JSON-LD schema',
      'Accessible UI meeting WCAG 2.2 AA standards',
    ],
    techFocus: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Caddy'],
    scopingNote: "We scope projects to our team's real skills, timeline, and resources.",
  },
  {
    slug: 'full-stack-development',
    serviceType: 'FULL_STACK_APP',
    title: 'Full-Stack Application Development',
    tagline: 'Production-ready, type-safe web applications engineered for resilience and maintainability.',
    summary:
      'From complex SaaS MVPs to internal workflow dashboards, we build decoupled systems using TypeScript across the entire stack with clean modular architecture.',
    problemSolved:
      'Many startups and established businesses face bloated codebases, fragile ad-hoc integrations, and unmaintainable tech debt that grinds feature velocity to a halt.',
    whatWeBuild: [
      'Modular web applications and SaaS platforms',
      'Secure internal operational tools and administrative backoffices',
      'Role-based access control (RBAC) portals with multi-factor authentication',
      'Scalable REST and event-driven API services',
    ],
    deliverables: [
      'Strict TypeScript and shared validation contracts across frontend and backend',
      'PostgreSQL data models with versioned migrations and connection pooling',
      'Automated CI/CD pipelines, containerised environments, and health probes',
      'Comprehensive OpenAPI documentation and developer runbooks',
    ],
    techFocus: ['NestJS', 'Next.js', 'Fastify', 'Prisma', 'PostgreSQL', 'Redis'],
    scopingNote: "We scope projects to our team's real skills, timeline, and resources.",
  },
  {
    slug: 'ai-machine-learning',
    serviceType: 'AI_ML',
    title: 'AI & Machine Learning',
    tagline: 'Practical machine learning systems integrated directly into your existing business workflows.',
    summary:
      'We design and deploy predictive models, intelligent classification pipelines, and real-time inference endpoints that solve practical operational bottlenecks.',
    problemSolved:
      'AI initiatives frequently fail when treated as academic experiments that never make it into production software with reliable data pipelines, SLAs, and security controls.',
    whatWeBuild: [
      'Automated document classification and intelligent entity extraction',
      'Recommendation engines and predictive churn/scoring pipelines',
      'Data pre-processing, vector indexing, and pipeline orchestration',
      'Secure, containerised model inference microservices',
    ],
    deliverables: [
      'Clean data ingestion and preprocessing pipelines',
      'Low-latency REST inference APIs with validation guards',
      'Telemetry, latency monitoring, and model drift logging',
      'Privacy-conscious architectures where sensitive data stays on-premise or encrypted',
    ],
    techFocus: ['Python', 'FastAPI', 'PyTorch', 'Scikit-Learn', 'PostgreSQL / pgvector'],
    scopingNote: "We scope projects to our team's real skills, timeline, and resources.",
  },
  {
    slug: 'genai-agentic-ai',
    serviceType: 'GENAI_AGENTIC',
    title: 'Generative AI & Agentic AI',
    tagline: 'Autonomous AI agents, RAG knowledge assistants, and structured LLM integrations.',
    summary:
      'We develop reliable agentic workflows and retrieval-augmented generation (RAG) systems that act on business data with verifiable citations, deterministic safeguards, and zero hallucinations.',
    problemSolved:
      'Generic chatbot wrappers produce hallucinations, lack grounding in domain-specific company data, and lack the guardrails necessary for business operations.',
    whatWeBuild: [
      'Enterprise RAG systems grounded in proprietary company knowledge bases',
      'Autonomous multi-step agentic workflows for operational tasks',
      'Automated customer support assistants with escalation routing',
      'Structured extraction pipelines converting unstructured PDFs/emails into JSON',
    ],
    deliverables: [
      'Hybrid semantic + keyword search with citation verification',
      'Guardrail frameworks enforcing token limits, prompt security, and schema output',
      'Full audit trails capturing prompts, context chunks, and agent decisions',
      'Model evaluation harnesses and regression suites',
    ],
    techFocus: ['LangChain / LlamaIndex', 'OpenAI / Anthropic / Gemini APIs', 'pgvector', 'Redis', 'NestJS'],
    scopingNote: "We scope projects to our team's real skills, timeline, and resources.",
  },
  {
    slug: 'cloud-deployment-integrations',
    serviceType: 'OTHER_CONSULTATION',
    title: 'Cloud, Deployment & Integrations',
    tagline: 'Reproducible infrastructure, automated CI/CD, and robust third-party system integrations.',
    summary:
      'We containerise applications, establish zero-downtime deployment pipelines, harden production servers, and bridge third-party APIs into clean unified data layers.',
    problemSolved:
      'Deployment fragility, manual server tweaking, and opaque cloud configurations lead to unexpected outages, security holes, and high hosting bills.',
    whatWeBuild: [
      'Docker Compose & container orchestration architectures',
      'Automated GitHub Actions CI/CD with automated testing and security audits',
      'Reverse proxy configurations with Caddy (automatic TLS, HTTP/2 & HTTP/3)',
      'Backup, restore, and monitoring stacks with Prometheus, Grafana, and Loki',
    ],
    deliverables: [
      'Infrastructure as Code with reproducible local and production setups',
      'Hardened security profiles (CSP headers, firewall rules, least-privilege containers)',
      'Automated daily database backups with verified restore procedures',
      'Zero-downtime rolling updates and rollback runbooks',
    ],
    techFocus: ['Docker', 'Docker Compose', 'Caddy', 'GitHub Actions', 'Prometheus', 'Linux / VPS'],
    scopingNote: "We scope projects to our team's real skills, timeline, and resources.",
  },
];
