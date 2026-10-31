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
    id: 'discover',
    title: 'Discover & Align',
    summary:
      'We unpack your business objectives, target users, technical constraints, and measurable success criteria to define a lean, high-impact scope.',
    duration: 'Week 1',
    activities: [
      'Requirements discovery sessions & stakeholder interviews',
      'Technical feasibility assessment and architectural trade-off evaluation',
      'User journey mapping and core persona definition',
      'Scope bounding (MoSCoW prioritisation: Must, Should, Could, Won’t)',
    ],
    outputs: [
      'Technical Project Brief & PRD',
      'Architecture Decision Records (ADRs)',
      'Milestone schedule and transparent cost estimate',
    ],
  },
  {
    step: 2,
    id: 'plan-design',
    title: 'Plan & Design',
    summary:
      'We define the system architecture, database schema, data contracts, and design system before writing production code.',
    duration: 'Weeks 1–2',
    activities: [
      'Database entity-relationship modeling and indexing design',
      'API surface specification and shared Zod validation schemas',
      'Design tokens, responsive layouts, and interactive component specs',
      'Accessibility evaluation (WCAG 2.2 AA target)',
    ],
    outputs: [
      'Interactive component blueprints and UI specs',
      'OpenAPI specification draft and database migration plan',
      'Clickable wireframes and agreed user feedback flows',
    ],
  },
  {
    step: 3,
    id: 'build',
    title: 'Build & Iterate',
    summary:
      'We develop in short, transparent sprints with shared types, automated linting, and continuous review across frontend and backend modules.',
    duration: 'Weeks 3–6',
    activities: [
      'Trunk-based development with short-lived feature branches',
      'Strict TypeScript implementation across the full stack',
      'Automated unit testing on core business logic (>80% coverage)',
      'Bi-weekly demo builds deployed to private staging environments',
    ],
    outputs: [
      'Clean, modular codebase in a shared monorepo',
      'Working staging environment mirrored to production',
      'Transparent commit log with conventional commit history',
    ],
  },
  {
    step: 4,
    id: 'test-deploy',
    title: 'Test & Deploy',
    summary:
      'Comprehensive verification including automated E2E tests, accessibility scans, security audits, and zero-downtime deployment.',
    duration: 'Weeks 7–8',
    activities: [
      'End-to-end user journey tests with Playwright',
      'Automated accessibility scanning with axe-core',
      'Security posture review (CSP, OWASP Top 10, rate limiting, dependency auditing)',
      'Lighthouse performance tuning targeting 90+ on mobile',
    ],
    outputs: [
      'Production deployment behind Caddy reverse proxy with automatic TLS',
      'Verified automated daily database backup and restore drill',
      'Monitoring and alerting dashboards (Prometheus, Grafana, Loki)',
    ],
  },
  {
    step: 5,
    id: 'improve-maintain',
    title: 'Improve & Maintain',
    summary:
      'Long-term operational support, telemetry reviews, security patches, and incremental feature updates as your business grows.',
    duration: 'Ongoing',
    activities: [
      'Weekly automated dependency security updates and reviews',
      'Performance and conversion rate monitoring',
      'Scheduled data retention compliance and cleanup jobs',
      'Iterative roadmap feature releases based on user feedback',
    ],
    outputs: [
      'Monthly uptime, security, and performance reports',
      'Updated runbooks and system documentation',
      'Continuous feature backlog grooming',
    ],
  },
];

export const deliveryModel = {
  cadence: 'Weekly async status updates with recorded walkthroughs, bi-weekly live demos, and a dedicated shared Slack/Discord channel.',
  codeOwnership: 'You own 100% of the custom IP, repositories, and credentials generated for your project upon milestone settlement.',
  hostingFreedom: 'No vendor lock-in. All components run in standard open-source containers (Docker Compose) deployable to any VPS, bare-metal server, or cloud provider of your choice.',
};
