import { z } from 'zod';

export const PublishStatusEnum = z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']);
export type PublishStatus = z.infer<typeof PublishStatusEnum>;

export const ProductStatusEnum = z.enum(['COMING_SOON', 'IN_DEVELOPMENT', 'BETA', 'LIVE']);
export type ProductStatus = z.infer<typeof ProductStatusEnum>;

export const ProductStatusLabels: Record<ProductStatus, string> = {
  COMING_SOON: 'Coming Soon',
  IN_DEVELOPMENT: 'In Development',
  BETA: 'Beta',
  LIVE: 'Live',
};

export const ProjectTypeEnum = z.enum([
  'INDEPENDENT_PRODUCT',
  'INTERNAL_PORTFOLIO',
  'PAID_CLIENT_WORK',
]);
export type ProjectType = z.infer<typeof ProjectTypeEnum>;

export const ProjectTypeLabels: Record<ProjectType, string> = {
  INDEPENDENT_PRODUCT: 'Independent Product',
  INTERNAL_PORTFOLIO: 'Internal Portfolio Project',
  PAID_CLIENT_WORK: 'Paid Client Work',
};

export const ProjectCategoryEnum = z.enum([
  'BUSINESS_WEBSITE',
  'FULL_STACK_APP',
  'AI_ML',
  'GENAI_AGENTIC',
  'DATA_SCIENCE',
  'EXPERIMENTAL',
]);
export type ProjectCategory = z.infer<typeof ProjectCategoryEnum>;

export const ProjectCategoryLabels: Record<ProjectCategory, string> = {
  BUSINESS_WEBSITE: 'Business Websites',
  FULL_STACK_APP: 'Full-Stack Applications',
  AI_ML: 'AI & Machine Learning',
  GENAI_AGENTIC: 'GenAI & Agentic AI',
  DATA_SCIENCE: 'Data Science & Analytics',
  EXPERIMENTAL: 'Experimental & Prototypes',
};

export const projectSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(2),
  title: z.string().min(2),
  summary: z.string().min(10),
  projectType: ProjectTypeEnum,
  category: ProjectCategoryEnum,
  overview: z.string().min(10),
  problem: z.string().min(10),
  solution: z.string().min(10),
  features: z.array(z.string()).default([]),
  contribution: z.string().min(5),
  results: z.string().nullable().optional(),
  clientName: z.string().nullable().optional(),
  liveUrl: z.string().url().nullable().optional(),
  repoUrl: z.string().url().nullable().optional(),
  technologies: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  status: PublishStatusEnum.default('PUBLISHED'),
  sortOrder: z.number().int().default(0),
});
export type Project = z.infer<typeof projectSchema>;

export const productSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(2),
  name: z.string().min(2),
  tagline: z.string().nullable().optional(),
  problem: z.string().min(10),
  targetUsers: z.string().nullable().optional(),
  features: z.array(z.string()).default([]),
  roadmap: z.array(z.string()).default([]),
  bodyMd: z.string().nullable().optional(),
  productStatus: ProductStatusEnum.default('COMING_SOON'),
  externalUrl: z.string().url().nullable().optional(),
  demoUrl: z.string().url().nullable().optional(),
  isFeatured: z.boolean().default(false),
  status: PublishStatusEnum.default('PUBLISHED'),
});
export type Product = z.infer<typeof productSchema>;

export const teamMemberSchema = z.object({
  id: z.string().uuid().optional(),
  fullName: z.string().min(2),
  roleTitle: z.string().min(2),
  bio: z.string().min(10),
  interests: z.array(z.string()).default([]),
  links: z.record(z.string()).default({}),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});
export type TeamMember = z.infer<typeof teamMemberSchema>;

export const faqSchema = z.object({
  id: z.string().uuid().optional(),
  topic: z.string().min(2),
  question: z.string().min(5),
  answerMd: z.string().min(10),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});
export type FAQ = z.infer<typeof faqSchema>;
