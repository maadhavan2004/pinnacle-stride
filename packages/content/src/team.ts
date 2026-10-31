import { TeamMember } from '@ps/schemas';

export const teamMembersData: TeamMember[] = [
  {
    fullName: 'Aarav Sharma',
    roleTitle: 'Founder & Systems Architect',
    bio: 'Leads technical architecture, cloud infrastructure, container orchestration, and security hardening. Focused on building rock-solid, verifiable software that scales without unnecessary complexity.',
    interests: ['Distributed Systems', 'PostgreSQL Internals', 'Rust & Go', 'Infrastructure as Code', 'Network Security'],
    links: {
      github: 'https://github.com/pinnaclestride',
      linkedin: 'https://linkedin.com/company/pinnaclestride',
    },
    sortOrder: 1,
    isPublished: true,
  },
  {
    fullName: 'Rohan Mehta',
    roleTitle: 'Full-Stack Software Engineer',
    bio: 'Specialises in type-safe TypeScript architectures, robust NestJS backend modules, relational data modeling with Prisma, and resilient background queues.',
    interests: ['TypeScript Strict Mode', 'NestJS & Fastify', 'API Contract Design', 'Event-Driven Queues', 'Database Indexing'],
    links: {
      github: 'https://github.com/pinnaclestride',
      linkedin: 'https://linkedin.com/company/pinnaclestride',
    },
    sortOrder: 2,
    isPublished: true,
  },
  {
    fullName: 'Priya Nair',
    roleTitle: 'AI & Data Specialist',
    bio: 'Designs grounded retrieval-augmented generation (RAG) pipelines, semantic embeddings, and machine learning inference services with strict deterministic guardrails.',
    interests: ['LLM Guardrails', 'Vector Search & pgvector', 'PyTorch & Transformers', 'Data Engineering', 'Evaluation Harnesses'],
    links: {
      github: 'https://github.com/pinnaclestride',
      linkedin: 'https://linkedin.com/company/pinnaclestride',
    },
    sortOrder: 3,
    isPublished: true,
  },
  {
    fullName: 'Ananya Verma',
    roleTitle: 'Product & Design Lead',
    bio: 'Drives product strategy, interaction design, WCAG 2.2 AA accessibility, and design token architecture. Crafts digital experiences that convey clarity, trust, and speed.',
    interests: ['Design Systems', 'Web Accessibility (a11y)', 'Interaction Design', 'Conversion Optimisation', 'Microcopy'],
    links: {
      github: 'https://github.com/pinnaclestride',
      linkedin: 'https://linkedin.com/company/pinnaclestride',
    },
    sortOrder: 4,
    isPublished: true,
  },
];

export const companyOverview = {
  name: 'PinnacleStride',
  tagline: 'Build Beyond. Stride Ahead.',
  positioning:
    'A product-building technology startup that also delivers custom digital solutions to businesses.',
  mission:
    'To build reliable, verifiable digital products and bespoke technology solutions with honest scoping, engineering discipline, and transparent communication.',
  vision:
    'To be the trusted engineering partner for businesses and founders who value technical craftsmanship, ethical software practices, and measurable real-world outcomes over marketing hype.',
  values: [
    {
      title: 'Product Mindset',
      description: 'We build and own real products, giving us direct empathy for shipping, user feedback, iteration, and long-term maintenance.',
    },
    {
      title: 'Honest Scoping',
      description: 'We scope projects to our team’s real skills, timeline, and resources. We never promise every solution in every technology.',
    },
    {
      title: 'Transparent Process',
      description: 'Five clear stages from discovery to maintenance. No surprise costs, opaque black boxes, or hidden vendor lock-in.',
    },
    {
      title: 'Accessibility & Performance',
      description: 'Fast, lightweight code loading in under 2 seconds, meeting WCAG 2.2 AA standards so everyone can access your software.',
    },
    {
      title: 'Privacy by Design',
      description: 'Minimal data collection, cookieless privacy-conscious analytics, and strict security posture to safeguard your business and users.',
    },
  ],
  remoteFirstStatement:
    'PinnacleStride is a remote-first startup. Our distributed setup fosters disciplined asynchronous communication, documented decisions (ADRs), clear code reviews, and deep focused engineering without boardroom distraction.',
};
