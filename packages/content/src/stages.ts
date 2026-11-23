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
      'We understand client requirements, business objectives, target audience, and technical expectations to establish a clear foundation.',
    duration: 'Week 1',
    activities: [
      'Requirement gathering',
      'Understanding the business problem',
      'Identifying target users',
      'Initial technical analysis',
      'Defining project scope',
    ],
    outputs: [
      'Requirement document',
      'Initial project scope',
      'Project understanding summary',
    ],
  },
  {
    step: 2,
    id: 'planning',
    title: 'Planning',
    summary:
      'Architecting system blueprints, database models, technical feasibility, and implementation roadmap.',
    duration: 'Weeks 1–2',
    activities: [
      'Technology selection',
      'Technical feasibility assessment',
      'Architecture planning',
      'Timeline estimation',
      'Feature prioritisation',
    ],
    outputs: [
      'Technical plan',
      'Proposed architecture',
      'Project implementation plan',
    ],
  },
  {
    step: 3,
    id: 'development',
    title: 'Development',
    summary:
      'Turning ideas and plans into functional digital solutions with clean full-stack TypeScript.',
    duration: 'Weeks 3–6',
    activities: [
      'Frontend development',
      'Backend development',
      'Database integration',
      'API integration',
      'Feature implementation',
    ],
    outputs: [
      'Functional application components',
      'Integrated features',
      'Development demonstration',
    ],
  },
  {
    step: 4,
    id: 'testing',
    title: 'Testing',
    summary:
      'Verifying functionality, improving reliability, and refining the solution across all devices.',
    duration: 'Weeks 6–7',
    activities: [
      'Functional testing',
      'API testing',
      'Integration testing',
      'Responsive testing',
      'Bug fixing',
    ],
    outputs: [
      'Tested application',
      'Issue report',
      'Verified functionality',
    ],
  },
  {
    step: 5,
    id: 'launch',
    title: 'Launch',
    summary:
      'Delivering the completed solution, production cutover, and taking your idea live.',
    duration: 'Week 8+ & Ongoing',
    activities: [
      'Final review',
      'Deployment preparation',
      'Production deployment',
      'Handover',
      'Agreed post-launch support',
    ],
    outputs: [
      'Deployed solution',
      'Handover documentation',
      'Delivery confirmation',
    ],
  },
];

export const deliveryModel = {
  cadence: 'Weekly async status updates with recorded walkthroughs, bi-weekly live demos, and a dedicated shared Slack/Discord channel.',
  codeOwnership: 'You own 100% of the custom IP, repositories, and credentials generated for your project upon milestone settlement.',
  hostingFreedom: 'No vendor lock-in. All components run in standard open-source containers (Docker Compose) deployable to any VPS, bare-metal server, or cloud provider of your choice.',
};
