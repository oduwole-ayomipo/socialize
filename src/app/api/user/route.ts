import { NextRequest, NextResponse } from "next/server";
import { database } from "@/src/db/knex";
import { NextApiResponse } from "next";

// Read
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const user = await database.select("*").from("User").where({ id: id });

    return NextResponse.json({ users: user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create
export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const { username, email, bio } = await req.json();

    const newUser = await database("User")
      .insert({
        registered_at: new Date(),
        last_login_at: new Date(),
        email: email,
        bio: bio,
        profile_image: null,
        username: username,
      })
      .returning("*");

    return res.status(200).json({ users: newUser });
  } catch (error) {
    console.error("Error fetching user: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update
export async function PATCH(req: NextRequest) {
  try {
    const { id, username, bio, profile_image } = await req.json();

    const updateUser = await database("User")
      .where({ id: id })
      .update({
        bio: bio,
        profile_image: profile_image,
        username: username,
      })
      .returning("*");

    return NextResponse.json({ users: updateUser }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//Mock delete
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const id = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "user does not exist" },
        { status: 400 }
      );
    }
    const deletedCount = await database("User").where("id", id).delete();

    if (deletedCount > 0) {
      return NextResponse.json(
        { message: "User deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching User: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
