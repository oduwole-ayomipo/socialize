import { NextRequest, NextResponse } from "next/server";
import { database } from "@/src/db/knex";

// Mock read
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { user_id, post_id } = await req.json();

    if (!user_id && !post_id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const comment = await database
      .select("comment_text", "created_at", "likes_count")
      .from("Comment")
      .where({ user_id: user_id, post_id: post_id });

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

// Mock create
export async function POST(req: NextRequest) {
  try {
    const { id, post_id, user_id, comment_text } = await req.json();

    console.log("Parsed request body:", { post_id, user_id, comment_text });

    const newComment = await database("Comment")
      .insert({
        id: id,
        post_id: post_id,
        user_id: user_id,
        comment_text: comment_text,
        created_at: new Date(),
        likes_count: null,
        status: false, // edited = true, not edited = false
      })
      .returning("*");

    await database("Post")
      .where({ user_id: user_id, id: post_id })
      .increment("comments_count", 1);

    await database("Notification").insert({
      user_id: user_id,
      notification_text: "one new comment on your post",
      created_at: new Date(),
      status: false,
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

// Mock update
export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const { id, comment_text } = await req.json();

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

// Mock delete
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();

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
