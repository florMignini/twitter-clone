import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = path === "/signin" || path === "/signup";

  //getting token session if it exist
  const token = request.cookies.get("sessionToken")?.value || "";
  
  //redirect logged user
  if (publicPaths && token) {
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }
  //otherwise
  if (!publicPaths && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home", "/signin", "/signup"],
};