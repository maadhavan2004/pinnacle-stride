import { z } from 'zod';

export const ServiceTypeEnum = z.enum([
  'BUSINESS_WEBSITE',
  'FULL_STACK_APP',
  'AI_ML',
  'GENAI_AGENTIC',
  'OTHER_CONSULTATION',
]);
export type ServiceType = z.infer<typeof ServiceTypeEnum>;

export const ServiceTypeLabels: Record<ServiceType, string> = {
  BUSINESS_WEBSITE: 'Websites & Business Solutions',
  FULL_STACK_APP: 'Full-Stack Application Development',
  AI_ML: 'AI & Machine Learning',
  GENAI_AGENTIC: 'Generative AI & Agentic AI',
  OTHER_CONSULTATION: 'Cloud, Deployment & Integrations',
};

export const BudgetRangeEnum = z.enum([
  'UNDER_25K',
  'RANGE_25K_75K',
  'RANGE_75K_2L',
  'ABOVE_2L',
  'NOT_SURE',
]);
export type BudgetRange = z.infer<typeof BudgetRangeEnum>;

export const BudgetRangeLabels: Record<BudgetRange, string> = {
  UNDER_25K: 'Under ₹25,000',
  RANGE_25K_75K: '₹25,000 – ₹75,000',
  RANGE_75K_2L: '₹75,000 – ₹2,00,000',
  ABOVE_2L: 'Above ₹2,00,000',
  NOT_SURE: 'Not sure yet / Flexible',
};

export const TimelineOptionEnum = z.enum([
  'TWO_TO_FOUR_WEEKS',
  'ONE_TO_THREE_MONTHS',
  'FLEXIBLE',
]);
export type TimelineOption = z.infer<typeof TimelineOptionEnum>;

export const TimelineOptionLabels: Record<TimelineOption, string> = {
  TWO_TO_FOUR_WEEKS: 'Within 2–4 weeks',
  ONE_TO_THREE_MONTHS: 'Within 1–3 months',
  FLEXIBLE: 'Flexible / Need consultation',
};

export const InquiryStatusEnum = z.enum([
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'WON',
  'LOST',
  'SPAM',
]);
export type InquiryStatus = z.infer<typeof InquiryStatusEnum>;

export const inquirySchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(120, 'Name must be 120 characters or fewer'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().max(120, 'Company name too long').optional().or(z.literal('')),
  serviceType: ServiceTypeEnum,
  budgetRange: BudgetRangeEnum.default('NOT_SURE'),
  timeline: TimelineOptionEnum.default('FLEXIBLE'),
  message: z
    .string()
    .min(20, 'Please describe your requirements in at least 20 characters')
    .max(5000, 'Requirements description must be under 5000 characters'),
  consent: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the processing of your details according to our Privacy Policy'),
  website: z
    .string()
    .max(0, 'Spam honeypot triggered')
    .optional()
    .or(z.literal('')),
  captchaPayload: z.string().optional(),
  sourcePage: z.string().optional(),
  utm: z.record(z.string()).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const inquiryUpdateSchema = z.object({
  status: InquiryStatusEnum.optional(),
  note: z.string().max(2000).optional(),
});

export type InquiryUpdateInput = z.infer<typeof inquiryUpdateSchema>;
