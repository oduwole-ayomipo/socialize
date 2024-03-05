import configureKnex from "knex";

export const database = configureKnex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  searchPath: ["public"],
});

declare module "knex/types/tables" {
  interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    profile_image: Buffer | null;
    bio: string | null;
    registered_at: Date;
    last_login_at: Date;
  }

  interface Comment {
    id: number;
    created_at: Date;
    post_id: number;
    author_id: number;
    comment_text: string;
    isEdited: boolean; //  edited === true or unedited === false
    likes_count: number | null;
  }

  interface Notification {
    id: number;
    created_at: Date;
    notification_text: string;
    sender_id: number | null;
    isRead: boolean; // read === true or unread === false
  }

  interface Post {
    id: number;
    created_at: Date;
    user_id: number;
    post_content: string;
    post_media: Buffer | null;
    post_title: string | null;
    likes_count: number | null;
    comments_count: number | null;
    shares_count: number | null;
  }

  interface Likes {
    id: number;
    created_at: Date;
    post_id: number;
    liked_by: number;
  }

  interface Tables {
    notifications: Notification;
    posts: Post;
    comments: Comment;
    users: User;
    likes: Likes;
  }
}
