import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //google session
/*   const { data: session } = useSession()
  console.log(session) */
  const path = request.nextUrl.pathname;
  const publicPaths = path === "/signin" || path === "/signup";

  //getting token session if it exist
  const token = request.cookies.get("sessionToken")?.value || "";

  //redirect logged user
  if (publicPaths && token /* && session */) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  //otherwise
  if (!publicPaths && !token /* && !session */) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}


export const config = {
  matcher: ["/", "/signin", "/signup"],
};
