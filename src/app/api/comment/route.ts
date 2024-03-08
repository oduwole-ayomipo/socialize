import { NextRequest, NextResponse } from "next/server";
import { TPostId, TAuthorId, TCommentText } from "@/src/app/schema";

import { database } from "@/src/db/knex";

//  Read
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const post_id = req.nextUrl.searchParams.get("post_id");

    if (!post_id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const comment = await database
      .count("comment_text", "created_at", "likes_count", "author_id")
      .from("Comment")
      .where({ post_id: post_id });

    console.log({ comment });

    return NextResponse.json({ comments: comment }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments: ", error);
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
      post_id,
      author_id,
      comment_text,
    }: {
      post_id: TPostId;
      author_id: TAuthorId;
      comment_text: TCommentText;
    } = await req.json();

    console.log("Parsed request body:", { post_id, author_id, comment_text });

    // create new post
    const newComment = await database("Comment")
      .insert({
        post_id: post_id,
        author_id: author_id,
        comment_text: comment_text,
      })
      .returning("*");

    // add a notification
    await database("Notification").insert({
      sender_id: author_id,
      notification_text: "*blah blah* commented on your post",
      created_at: new Date(),
    });

    return NextResponse.json({ comments: newComment }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments: ", error);
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
      comment_text,
    }: {
      id: TPostId;
      comment_text: TCommentText;
    } = await req.json();

    const updateComment = await database("Comment")
      .where({ id: id })
      .update({
        comment_text: comment_text,
        created_at: new Date(),
        status: true,
      })
      .returning("*");

    return NextResponse.json({ comments: updateComment }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const id: TCommentText = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "comment does not exist" },
        { status: 400 }
      );
    }
    const deletedCount = await database("Comment").where("id", id).delete();

    if (deletedCount > 0) {
      return NextResponse.json(
        { message: "Comment deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching comments: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
