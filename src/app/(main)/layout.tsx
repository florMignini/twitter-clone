import { LeftSidebar, RightSidebar } from "@/components";
import { TweetProvider } from "@/context";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TweetProvider>
      <div className="p-0 w-full h-screen grid grid-cols-[15%,85%] lg:grid-cols-[19%,50%,30%] relative md:px-10 2xl:px-72">
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
    </TweetProvider>
  );
}
