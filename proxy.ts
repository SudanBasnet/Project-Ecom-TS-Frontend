import { NextResponse, type NextRequest } from "next/server";

const AUTH_COOKIE = "bs_auth";
const ROLE_COOKIE = "bs_role";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = Boolean(request.cookies.get(AUTH_COOKIE)?.value);
  const role = request.cookies.get(ROLE_COOKIE)?.value;

  if (
    !isLoggedIn &&
    (pathname.startsWith("/admin") || pathname.startsWith("/dashboard"))
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    isLoggedIn &&
    (pathname === "/auth/login" || pathname === "/auth/register")
  ) {
    return NextResponse.redirect(
      new URL(role === "admin" ? "/admin" : "/", request.url),
    );
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/dashboard") && role === "admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
