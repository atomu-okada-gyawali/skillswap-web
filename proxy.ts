import { getAuthToken, getUserData } from "@/lib/cookies";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getAuthToken();
  const user = token ? await getUserData() : null;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && !isPublicRoute && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard/explore", request.url));
  }

  if (token && user) {
    if (pathname.startsWith("/admin") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/explore", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard",
    "/admin/:path*",
    "/admin",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
