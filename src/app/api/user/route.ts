import { NextRequest, NextResponse } from "next/server";
import { database } from "@/src/db/knex";

//Mock read
export async function GET(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Comment ID is required" },
        { status: 400 }
      );
    }

    const user = await database.select("*").from("User").where(id);

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

//Mock create
export async function POST(req: NextRequest) {
  try {
    const { username, email, passowrd, bio } = await req.json();

    const newUser = await database("User")
      .insert({
        registered_at: new Date(),
        last_login_at: new Date(),
        email: email,
        passowrd: passowrd,
        bio: bio,
        profile_picture: null,
        username: username,
      })
      .returning("*");
  } catch (error) {
    console.error("Error fetching user: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

//Mock update
export async function PATCH(req: NextRequest) {
  try {
    const { id, username, bio, profile_picture } = await req.json();

    const updateUser = await database("User")
      .where({ id: id })
      .update({
        bio: bio,
        profile_picture: profile_picture,
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
    const { id } = await req.json();

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
