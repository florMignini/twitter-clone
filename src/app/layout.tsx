import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs"
import type { Metadata } from "next";
import { Providers } from "./providers";
import { SocketProvider } from "@/context/socket-provider";
import { TweetProvider } from "@/context";
import { EdgeStoreProvider } from "../lib/edgestore";
import {Open_Sans} from "next/font/google"

const font = Open_Sans({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "X-Clone",
  description: "X-Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ClerkProvider>
      <html lang="en" className="bg-black w-full h-screen">
      <body className={font.className}>
        <SocketProvider>
            <Providers>
              <EdgeStoreProvider>
                {children}
              </EdgeStoreProvider>
            </Providers>
        </SocketProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
