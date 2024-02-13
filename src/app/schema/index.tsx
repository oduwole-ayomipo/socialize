import { z } from "zod";

const email = z.string().email("Invalid email address");

const password = z.string().min(6, "Password must be at least 6 Characters");

const fullname = z.string().min(6, "Full name must be at least 6 Characters");

const username = z.string().min(2, "Username must be at least 2 Characters");

// validation schemas
export const loginSchema = z.object({
  email,
  password,
});

export const registerSchema = z.object({
  email,
  password,
  username,
  fullname,
});

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;
