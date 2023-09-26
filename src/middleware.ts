
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  
  const path = request.nextUrl.pathname;
  const publicPaths = path === "/signin" || path === "/signup";
  
  //getting token session if it exist
  const token = request.cookies.get("sessionToken")?.value || "";
  //google session
  const googleToken = request.cookies.get("next-auth.session-token")?.value
console.log(googleToken)
  //redirect logged user
  if (publicPaths && token && googleToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  //otherwise
  if (!publicPaths && !token && !googleToken) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}


export const config = {
  matcher: ["/", "/signin", "/signup"],
};
