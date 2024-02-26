import { NextRequest, NextResponse } from "next/server";
import { database } from "@/src/db/knex";

export async function GET(req: NextRequest) {
  try {
    const comment = await database.select("*").from("Comment").where("id", "3");

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
