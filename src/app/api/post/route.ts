import { NextRequest, NextResponse } from "next/server";
import { database } from "@/src/db/knex";

// Mock read
export async function GET(req: NextResponse) {
  try {
    const { post_id } = await req.json();

    if (!post_id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const post = await database
      .select("*")
      .from("Post")
      .where({ post_id: post_id });

    console.log({ post });

    return NextResponse.json({ posts: post }, { status: 200 });
  } catch (error) {
    console.error("Error fetching post: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

//Mock create
export async function POST(req: NextRequest) {
  try {
    const { user_id, post_content, post_media, post_title } = await req.json();

    const newPost = await database("Post")
      .insert({
        user_id: user_id,
        post_content: post_content,
        post_media: post_media,
        post_title: post_title,
      })
      .returning("*");

    await database("Notification").insert({
      user_id: user_id,
      notification_text: "post successfully uploaded",
      created_at: new Date(),
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

//Mock update
export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const { id, post_content, post_title } = await req.json();

    const updatePost = await database("Comment")
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

//Mock delete
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();

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
