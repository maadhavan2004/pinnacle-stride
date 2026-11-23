export interface ProcessStage {
  step: number;
  id: string;
  title: string;
  summary: string;
  duration: string;
  activities: string[];
  outputs: string[];
}

export const processStages: ProcessStage[] = [
  {
    step: 1,
    id: 'discovery',
    title: 'Discovery',
    summary:
      'We understand the client’s requirements, business objectives, target audience, and technical expectations to establish a clear foundation.',
    duration: 'Week 1',
    activities: [
      'Requirement gathering & stakeholder discovery sessions',
      'Understanding the core operational problem & user personas',
      'Initial architectural discussions & technical feasibility analysis',
      'Technical requirement analysis & constraint identification',
      'Scope identification & priority definition (MoSCoW framework)',
    ],
    outputs: [
      'Technical Project Brief & Product Requirements Document (PRD)',
      'Initial project scope & architecture boundaries',
      'Project understanding summary with milestone timeline',
    ],
  },
  {
    step: 2,
    id: 'planning',
    title: 'Planning',
    summary:
      'We architect the database schemas, API contracts, interactive component specifications, and design system before writing production code.',
    duration: 'Weeks 1–2',
    activities: [
      'Relational database entity-relationship modeling & indexing strategy',
      'API surface specification & shared Zod contract schemas',
      'Interactive design tokens, component wireframes & responsive layouts',
      'Security architecture definition & access control mapping',
      'WCAG 2.2 AA accessibility evaluation criteria',
    ],
    outputs: [
      'Interactive component blueprints & UI design tokens',
      'OpenAPI 3.1 specification & database migration roadmap',
      'Agreed user feedback flows & technical delivery plan',
    ],
  },
  {
    step: 3,
    id: 'development',
    title: 'Development',
    summary:
      'We engineer your application in transparent sprints with full-stack TypeScript, shared contracts, and continuous verification.',
    duration: 'Weeks 3–6',
    activities: [
      'Trunk-based development with clean, modular pull requests',
      'Strict TypeScript implementation across Next.js and NestJS',
      'Continuous unit testing on core business logic & data transformations',
      'Bi-weekly staging demo builds deployed to private cloud environments',
      'Database optimization, query indexing, and caching layers',
    ],
    outputs: [
      'Clean, modular full-stack codebase in a shared monorepo',
      'Functional staging environment mirrored to production',
      'Transparent commit log with conventional commit history',
    ],
  },
  {
    step: 4,
    id: 'testing',
    title: 'Testing',
    summary:
      'Rigorous regression testing across functional endpoints, cross-device responsiveness, security postures, and performance benchmarks.',
    duration: 'Weeks 7–8',
    activities: [
      'End-to-end user journey verification across critical workflows',
      'Automated accessibility scanning & keyboard navigation audit',
      'Security posture review (OWASP Top 10, rate limiting, CORS headers, honeypots)',
      'Lighthouse performance tuning targeting sub-second load times',
      'Cross-browser & cross-viewport responsive verification',
    ],
    outputs: [
      'Full regression test pass report across desktop, tablet, and mobile',
      'Automated backup snapshot & restore drill verification',
      'Production-ready build artifacts with zero unhandled exceptions',
    ],
  },
  {
    step: 5,
    id: 'launch',
    title: 'Launch',
    summary:
      'Zero-downtime production deployment, DNS cutover, telemetry setup, and long-term operational support as your business scales.',
    duration: 'Week 9+ & Ongoing',
    activities: [
      'Production deployment behind reverse proxy with automated SSL/TLS',
      'Continuous telemetry, error tracking, and health monitoring',
      'DNS cutover and live environment post-launch verification',
      'Scheduled security dependency patching and automated backups',
      'Iterative roadmap feature releases based on real user feedback',
    ],
    outputs: [
      'Live, fully functional production application accessible to users',
      'Complete repository ownership, environment configurations, and runbooks',
      'Monthly uptime, security, and performance reliability assurance',
    ],
  },
];

export const deliveryModel = {
  cadence: 'Weekly async status updates with recorded walkthroughs, bi-weekly live demos, and a dedicated shared Slack/Discord channel.',
  codeOwnership: 'You own 100% of the custom IP, repositories, and credentials generated for your project upon milestone settlement.',
  hostingFreedom: 'No vendor lock-in. All components run in standard open-source containers (Docker Compose) deployable to any VPS, bare-metal server, or cloud provider of your choice.',
};
