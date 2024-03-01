import configureKnex from "knex";

export const database = configureKnex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  searchPath: ["public"],
});

declare module "knex/types/tables" {
  interface User {
    id: number;
    registered_at: Date;
    last_login_at: Date;
    username: string;
    email: string;
    password: string;
    profile_image: Buffer | null;
    bio: string | null;
  }

  interface Tables {
    users: User;
  }
}

declare module "knex/types/tables" {
  interface Comment {
    id: number;
    created_at: Date;
    post_id: number;
    user_id: number;
    comment_text: string;
    status: boolean; //  edited === true or unedited === false
    likes_count: number | null;
  }

  interface Tables {
    comments: Comment;
  }
}

declare module "knex/types/tables" {
  interface Notification {
    id: number;
    created_at: Date;
    notification_text: string;
    user_id: number;
    status: boolean; // read === true or unread === false
  }

  interface Tables {
    notifications: Notification;
  }
}

declare module "knex/types/tables" {
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

  interface Tables {
    posts: Post;
  }
}
