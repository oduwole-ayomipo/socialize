/* import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("user");
  const path = request.nextUrl.pathname;

  if (
    !currentUser &&
    path !== "/login" &&
    path !== "/register" &&
    path !== "/password-reset"
  ) {
    // User is not logged in, and trying to access a page other than login or register
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (currentUser) {
    // User is logged in, allow access to all pages
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
 */

import { RequestHandler } from "next/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const admin = require("../firebaseAdmin");

async function decodeToken(req: NextRequest, res: any, next: RequestHandler) {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res.json({ message: "unauthorized" });
    }

    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      return next();
    } else {
      return res.json({ message: "unauthorized" });
    }
  } catch (error) {
    console.error("Error in decoding token:", error);
    return res.json({ message: "Internal Error" });
  }
}

export const middleware = (handler: RequestHandler) => {
  return async (req: NextRequest) => {
    const currentUser = req.cookies.get("user");
    const path = req.nextUrl.pathname;

    if (
      !currentUser &&
      !["/login", "/register", "/password-reset"].includes(path)
    ) {
      // User is not logged in, and trying to access a page other than login or register
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (currentUser) {
      // User is logged in, allow access to all pages
      return handler(req);
    }
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default decodeToken;
