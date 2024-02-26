import { NextRequest, NextResponse } from "next/server";
import { database } from "@/src/db/knex";

export async function GET(req: NextRequest) {
  try {
    const user = await database.select("*").from("User").where("id", 4);

    console.log({ user });

    return NextResponse.json({ users: user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
