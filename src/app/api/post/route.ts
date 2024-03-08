import { NextRequest, NextResponse } from "next/server";
import { database } from "@/src/db/knex";
import {
  TPostContent,
  TPostId,
  TPostMedia,
  TPostTitle,
  TUserId,
} from "@/src/app/schema";

// Read
export async function GET(req: NextResponse) {
  try {
    const user_id = req.nextUrl.searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { message: "user is required" },
        { status: 400 }
      );
    }

    const post = await database
      .select("*")
      .from("Post")
      .where({ user_id: user_id });

    return NextResponse.json({ posts: post }, { status: 200 });
  } catch (error) {
    console.error("Error fetching post: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create
export async function POST(req: NextRequest) {
  try {
    const {
      user_id,
      post_content,
      post_media,
      post_title,
    }: {
      user_id: TUserId;
      post_content: TPostContent;
      post_media: TPostMedia;
      post_title: TPostTitle;
    } = await req.json();

    const newPost = await database("Post")
      .insert({
        user_id: user_id,
        post_content: post_content,
        post_media: post_media,
        post_title: post_title,
      })
      .returning("*");

    await database("User").where({ id: user_id }).increment("post_count", 1);

    await database("Notification").insert({
      notification_text: "post successfully uploaded",
      sender_id: null,
      created_at: new Date(),
      isRead: false,
    });

    return NextResponse.json({ post: newPost }, { status: 200 });
  } catch (error) {
    console.error("Error fetching post: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update
export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const {
      id,
      post_content,
      post_title,
    }: {
      id: TPostId;
      post_content: TPostContent;
      post_title: TPostTitle;
    } = await req.json();

    const updatePost = await database("Post")
      .where({ id: id })
      .update({
        post_content: post_content,
        post_title: post_title,
        created_at: new Date(),
        status: true,
      })
      .returning("*");

    return NextResponse.json({ posts: updatePost }, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const id: TPostId = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "post does not exist" },
        { status: 400 }
      );
    }
    const deletedCount = await database("Post").where("id", id).delete();

    if (deletedCount > 0) {
      return NextResponse.json(
        { message: "Post deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching Post: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
