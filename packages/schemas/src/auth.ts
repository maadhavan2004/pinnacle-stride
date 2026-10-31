import { z } from 'zod';

export const UserRoleEnum = z.enum(['OWNER', 'EDITOR', 'VIEWER']);
export type UserRole = z.infer<typeof UserRoleEnum>;

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  twoFactorCode: z.string().length(6).optional(),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const twoFactorVerifySchema = z.object({
  token: z.string().length(6, 'Authentication code must be 6 digits'),
});
export type TwoFactorVerifyInput = z.infer<typeof twoFactorVerifySchema>;
