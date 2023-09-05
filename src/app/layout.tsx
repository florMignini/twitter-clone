
import "./globals.css";
import type { Metadata } from "next";


import { Providers } from "./providers";
import { LeftSidebar, RightSidebar } from "@/components";
import { cookies } from "next/headers";

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

  return (
    <html lang="en">
      <body>
      
        <Providers>
          <div className="w-full h-full justify-center items-center relative bg-black xl:px-8 2xl:px-40">
            {!isSession ? (
              <>{children}</>
            ) : (
              <>
                <div className=" w-full h-full grid grid-cols-[20%,80%] xl:grid-cols-[20%,50%,30%] gap-1 relative md:px-4 2xl:px-40">
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
              </>
            )}
          </div>
        </Providers>

      </body>
    </html>
  );
}
