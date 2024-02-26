import configureKnex from "knex";

export const database = configureKnex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  searchPath: ["public"],
});

declare module "knex/types/tables" {
  interface User {
    id: number;
    registeredAt: Date;
    lastLoginAt: Date;
    uername: string;
    email: string;
    password: string;
    profileImage: Buffer | null;
    bio: string | null;
  }

  interface Tables {
    users: User;
  }
}

declare module "knex/types/tables" {
  interface Comment {
    id: number;
    createdAt: Date;
    postId: number;
    userId: number;
    comment: string;
    likesCount: number;
  }

  interface Tables {
    comments: Comment;
  }
}
