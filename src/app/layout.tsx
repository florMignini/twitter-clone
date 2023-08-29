import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "./providers";
import { LeftSidebar, RightSidebar } from "@/components";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <Providers>
          <div className="w-full h-full justify-center items-center relative bg-black xl:px-8 2xl:px-40">
            <div className=" w-full h-full grid grid-cols-[20%,80%] xl:grid-cols-[20%,50%,30%] gap-1 relative md:px-4 2xl:px-40">
              {/* Sidebar and notification section */}
              <div className="">
                <LeftSidebar />
              </div>
              {/* Main content ---> Twitts */}
              <div className="">{children}</div>
              {/* What's happening & Who to follow section*/}
              <div className="">
                <RightSidebar />
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
