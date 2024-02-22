import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("user");
  const path = request.nextUrl.pathname;

  if (!currentUser && path !== "/login" && path !== "/register") {
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
