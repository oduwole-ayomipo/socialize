import * as yup from "yup";

interface LoginData {
  email: string;
  password: string;
}

interface ResgisterData {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

// Common validation schema
const emailSchema = yup
  .string()
  .email("Invalid email address")
  .required("Email is required");
const passwordSchema = yup
  .string()
  .min(6, "Password must be at least 6 Charactets")
  .required("Password is required");
const fullnameSchema = yup
  .string()
  .min(6, "Full name must be at least 6 Charactets")
  .required("Full name is required");
const usernameSchema = yup
  .string()
  .min(2, "username nust at least 2 Charactets")
  .required("Username is required");

// Form validation schema
export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  fullname: fullnameSchema,
  username: usernameSchema,
});
