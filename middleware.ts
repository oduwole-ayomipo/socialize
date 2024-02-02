import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("user");
  const path = request.nextUrl.pathname;

  if (!currentUser && path !== "/login" && path !== "/register") {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (currentUser && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
