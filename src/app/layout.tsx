import "./globals.css";
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
    <html lang="en"
    className="bg-black w-full h-screen"
    >
      <body>
        <Providers>
          {!isSession && !isGoogleSession ? (
             <>{children}</>
          ) : (
            <div className=" w-full h-screen grid grid-cols-[20%,80%] xl:grid-cols-[20%,50%,30%] gap-1 relative md:px-4 2xl:px-40">
              {/* Sidebar and notification section  */}
              <div className="">
                <LeftSidebar />
              </div>
              {/* Main content ---> Twitts  */}
              <div className="">{children}</div>
              {/* What's happening & Who to follow section */}
              <div className="">
                <RightSidebar />
              </div>
            </div>
          )}
        </Providers>
      </body>
    </html>
  );
}
