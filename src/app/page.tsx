import { LeftSidebar, MainSection, RightSidebar } from "@/components";
import Login from "./login";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Home = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.auth.getUser()


  return (
    <div className="w-full h-full justify-center items-center relative bg-black xl:px-8 2xl:px-40">
      {
       data.user !== null ? (
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
        ) : (
          <Login />
        )
      }
    </div>
  )
}
export default Home;