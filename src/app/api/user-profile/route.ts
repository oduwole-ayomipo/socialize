import { NextRequest, NextResponse } from "next/server";
import { database } from "@/src/db/knex";
import { TBio, TEmail, TUserId, TUsername } from "../../schema";
import { NextApiResponse } from "next";
import { UserProfileSchema } from "../../schema";

// Read
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const user = await database
      .select("*")
      .from("UserProfile")
      .where({ id: id });

    return NextResponse.json({ users: user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new user profile
export async function POST(req: NextRequest, res: NextApiResponse) {
  const PartialUserProfileSchema = UserProfileSchema.pick({
    id: true,
    username: true,
    email: true,
    email_verified: true,
  });

  try {
    const { id, username, email, email_verified } = await req.json();

    const reqData = PartialUserProfileSchema.parse({
      id,
      username,
      email,
      email_verified,
    });

    const newUser = await database("UserProfile")
      .insert({
        id: reqData.id,
        email_verified: reqData.email_verified,
        created_at: new Date(),
        last_login_at: new Date(),
        email: reqData.email,
        username: reqData.username,
      })
      .returning("*");

    return NextResponse.json({ userprofiles: newUser }, { status: 200 });
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
    const {
      id,
      username,
      bio,
      profile_image,
    }: {
      id: TUserId;
      username: TUsername;
      bio: TBio;
      profile_image: BinaryType;
    } = await req.json();

    const updateUser = await database("UserProfile")
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
    const id: TUserId = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "user does not exist" },
        { status: 400 }
      );
    }
    const deletedCount = await database("UserProfile").where("id", id).delete();

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
