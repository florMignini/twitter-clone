import "./globals.css";
import { EdgeStoreProvider } from "../lib/edgestore";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { LeftSidebar, RightSidebar } from "@/components";
import { cookies } from "next/headers";
import SigninPage from "./signin/page";

export const metadata: Metadata = {
  title: "X-Clone",
  description: "X-Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const isSession = cookieStore.get("sessionToken");
  const isGoogleSession = cookieStore.get("next-auth.session-token");

  return (
    <html lang="en" className="bg-black w-full h-screen">
      <body>
        <Providers>
          <EdgeStoreProvider>
            {!isSession && !isGoogleSession ? (
              <>{children}</>
            ) : (
              <div className="p-0 w-full h-screen grid grid-cols-[20%,80%] xl:grid-cols-[20%,50%,30%] gap-1 relative md:px-4 2xl:px-72">
                {/* Sidebar and notification section  */}
                <div className="">
                  <LeftSidebar />
                </div>
                {/* Main content ---> Tweets  */}
                <div className="">{children}</div>
                {/* What's happening & Who to follow section */}
                <div className="">
                  <RightSidebar />
                </div>
              </div>
            )}
          </EdgeStoreProvider>
        </Providers>
      </body>
    </html>
  );
}
