import { FAQ } from '@ps/schemas';

export const faqsData: FAQ[] = [
  {
    topic: 'Pricing & Scoping',
    question: 'How do you price your custom engineering projects?',
    answerMd:
      'We work primarily on milestone-based fixed price contracts for well-defined scopes, or on a sprint-based retainer for iterative product builds. Typical projects range from ₹25,000 for focused business landing suites to ₹2,00,000+ for comprehensive full-stack platforms and bespoke AI implementations. Every quote is transparent, itemised, and scoped directly to real deliverables.',
    sortOrder: 1,
    isPublished: true,
  },
  {
    topic: 'Timelines & Delivery',
    question: 'How long does a typical project take from start to finish?',
    answerMd:
      'High-performance commercial websites typically ship in 2 to 4 weeks. Full-stack web applications, internal backoffices, and custom RAG/AI systems generally take between 6 to 10 weeks depending on integration complexity and scope.',
    sortOrder: 2,
    isPublished: true,
  },
  {
    topic: 'Code Ownership & IP',
    question: 'Who owns the code, intellectual property, and infrastructure?',
    answerMd:
      'You do. 100%. Upon milestone completion and settlement, full copyright and ownership of all custom code, design assets, database schemas, and deployment configurations are transferred entirely to your organisation. We hold zero vendor lock-in over your technology.',
    sortOrder: 3,
    isPublished: true,
  },
  {
    topic: 'Maintenance & Support',
    question: 'What happens after launch? Do you offer post-launch support?',
    answerMd:
      'Yes. Every project includes a 30-day post-launch warranty period covering bug fixes and operational stabilization at no extra charge. Following that, we offer monthly maintenance retainers covering security updates, server monitoring, database backups, and scheduled feature iterations.',
    sortOrder: 4,
    isPublished: true,
  },
  {
    topic: 'Remote Collaboration',
    question: 'How do you communicate and collaborate during an active project?',
    answerMd:
      'We operate with asynchronous discipline: structured weekly video walkthroughs, shared Slack/Discord channels for direct chat, bi-weekly live staging demos, and documented Architecture Decision Records (ADRs). You are never left wondering what progress was made.',
    sortOrder: 5,
    isPublished: true,
  },
];
