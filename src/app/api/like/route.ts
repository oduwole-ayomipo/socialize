import { database } from "@/src/db/knex";
import { NextRequest, NextResponse } from "next/server";

// Check the number of likes on a post
export async function GET(req: NextRequest) {
  try {
    const post_id = req.nextUrl.searchParams.get("post_id");

    if (!post_id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const likes = await database("Likes")
      .select("*")
      .where({ post_id: post_id });

    console.log({ likes });

    return NextResponse.json({ likes: likes }, { status: 200 });
  } catch (error) {
    console.error("error fetching likes count: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const liked_by = req.nextUrl.searchParams.get("liked_by");
    const post_id = await req.json();

    const likes = await database("Likes")
      .insert({
        liked_by: liked_by,
        post_id: post_id,
      })
      .returning("*");

    return NextResponse.json({ likes: likes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching likes: ", error);
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
        { message: "like ID does not exist" },
        { status: 400 }
      );
    }
    const deletedCount = await database("Likes").where("id", id).delete();

    if (deletedCount > 0) {
      return NextResponse.json(
        { message: "Like deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Like not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching Like: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
