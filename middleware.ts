import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

  // Parse cookies from the cookie string
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((cookie) => {
      const [name, value] = cookie.trim().split("=");
      return [name, value];
    })
  );

  const username = cookies["username"];
  const phone = cookies["number"];
  const isAuthenticated = Boolean(username && phone);

  const path = req.nextUrl.pathname;

  const isLoginPage = path === "/login";
  const isStatic =
    path.startsWith("/_next") ||
    path.startsWith("/static") ||
    path.startsWith("/api");

  if (isStatic) return NextResponse.next();

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"],
};
