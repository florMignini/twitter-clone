import { LeftSidebar, MainSection } from "@/components";
import { BsSearch } from "react-icons/bs";



export default function Home() {
  return (
    <div className="w-fill h-full justify-center items-center relative bg-black">
      <div className=" w-full h-full grid grid-cols-4 gap-2 relative px-12 ">
        {/* Sidebar and notification section */}
        <div className="">
          <LeftSidebar />
        </div>
        {/* Main content ---> Twitts */}
        <div className="col-span-2">
          <MainSection />
        </div>
        {/* this section disapears on mobile screens */}
        <div className="none ">
          <section className="fixed flex flex-col p-2" >
            <div className="rounded-full bg-gray-300/10">
              <div className="h-full w-fill relative grid grid-cols-[10%,90%] gap-4 p-3 text-sm  text-gray-500">
                <div className="flex items-center justify-center">
                  <BsSearch className="w-5 h-5" />
                </div>
                <div>
                <input
                  type="text"
                  placeholder="Search Twitter"
                  className="bg-transparent outline-none flex border-none items-center justify-center
                  text-gray-600
                  "
                />
                </div>
              </div>
            </div>
            <div></div>
            <div></div>
          </section>
        </div>

      </div>
    </div>
  )
}
