import { LeftSidebar, MainSection, RightSidebar } from "@/components";

import { cookies } from "next/headers";

const Home = async () => {
 

  return (
    <div className="w-full h-full justify-center items-center relative bg-black xl:px-8 2xl:px-40">

      <div className=" w-full h-full grid grid-cols-[20%,80%] xl:grid-cols-[20%,50%,30%] gap-1 relative md:px-4 2xl:px-40">
        {/* Sidebar and notification section */}
        <div className="">
          <LeftSidebar />
        </div>
        {/* Main content ---> Twitts */}
        <div className="">
          <MainSection />
        </div>
        {/* What's happening & Who to follow section*/}
        <div className="">
          <RightSidebar />
        </div>
      </div>



    </div>
  )
}
export default Home;