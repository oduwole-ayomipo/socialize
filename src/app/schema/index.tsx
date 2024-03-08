import { z } from "zod";

// Client side forms
const email = z.string().email("Invalid email address");

const password = z.string().min(6, "Password must be at least 6 Characters");

const fullname = z.string().min(6, "Full name must be at least 6 Characters");

const username = z.string().min(2, "Username must be at least 2 Characters");

const post_id = z.number();
const author_id = z.number();
const comment_text = z.string();
const liked_by = z.string();
const post_content = z.string();
const post_media = z.string();
const post_title = z.string();
const user_id = z.string();
const bio = z.string();

export type TPostId = z.infer<typeof post_id>;
export type TUserId = z.infer<typeof user_id>;
export type TPostContent = z.infer<typeof post_content>;
export type TPostMedia = z.infer<typeof post_media>;
export type TPostTitle = z.infer<typeof post_title>;
export type TLikedBy = z.infer<typeof liked_by>;
export type TCommentText = z.infer<typeof comment_text>;
export type TAuthorId = z.infer<typeof author_id>;
export type TUsername = z.infer<typeof username>;
export type TEmail = z.infer<typeof email>;
export type TBio = z.infer<typeof bio>;

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

// Forms
export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;
