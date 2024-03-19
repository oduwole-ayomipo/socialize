import { z } from "zod";

// Client side forms
const email = z.string().email("Invalid email address");

const password = z.string().min(6, "Password must be at least 6 Characters");

const fullname = z.string().min(6, "Full name must be at least 6 Characters");

const username = z.string().min(2, "Username must be at least 2 Characters");

// api routes
export const UserProfileSchema = z.object({
  id: z.string(),
  created_at: z.date(),
  username: z.string().min(2),
  last_login_at: z.date(),
  bio: z.string().min(3).max(64),
  email_verified: z.boolean(),
  email: z.string().email(),
});

// validation schemas
export const loginSchema = z.object({
  email,
  password,
});

export const passwordResetSchema = z.object({
  email,
});
export const registerSchema = z.object({
  email,
  password,
  username,
  fullname,
});

// Forms
export type TLoginSchema = z.infer<typeof loginSchema>;
export type TPasswordResetSchema = z.infer<typeof passwordResetSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;
