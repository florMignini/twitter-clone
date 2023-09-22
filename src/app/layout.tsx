import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
// import { LeftSidebar, RightSidebar } from "@/components";
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

  return (
    <html lang="en">
      <body>
        <Providers>
          {!isSession ? (
            <SigninPage />
          ) : (
            <>
            {children}
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}
