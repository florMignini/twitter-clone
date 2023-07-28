import { LeftSidebar, MainSection } from "@/components";
import { BsSearch, BsThreeDots } from "react-icons/bs";



export default function Home() {
  return (
    <div className="w-fill h-full justify-center items-center relative bg-black lg:px-8">
      <div className=" w-full h-full grid grid-cols-[20%,80%] lg:grid-cols-[20%,50%,30%] gap-2 relative px-12 lg:px-40">
        {/* Sidebar and notification section */}
        <div className="">
          <LeftSidebar />
        </div>
        {/* Main content ---> Twitts */}
        <div className="">
          <MainSection />
        </div>
        {/* What's happening & Who to follow section-->  this section disapears on mobile screens */}
        <div className="">
          <section className="sticky top-0 flex flex-col p-2" >
            {/* Search bar section */}
            <div className="rounded-full w-full bg-neutral-900/90 text-gray-600">
              <div className="h-full w-full relative grid grid-cols-[10%,90%] gap-4 p-3 text-sm">
                <label
                  htmlFor="searchItem"
                  className="flex items-center justify-center">
                  <BsSearch className="w-5 h-5" />
                </label>
                <div>
                  <input
                    type="text"
                    placeholder="Search Twitter"
                    className="bg-transparent outline-none flex border-none items-center justify-center
                  w-full
                  "
                  />
                </div>
              </div>
            </div>
            {/* You Might Like */}
            <div></div>
            {/* What's happening */}
            <div className="flex flex-col rounded-2xl  bg-neutral-900/90 mt-4">
              <h3 className="text-xl font-bold p-4">What's happening</h3>
              <div>
                {
                  Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="hover:bg-gray-800/90 transition duration-200 p-3 w-full h-full m-auto"
                    >
                      <div className="text-neutral-500 flex items-center justify-between">
                        <h6 className="text-xs">Trending in Argentina</h6>
                        <BsThreeDots
                          className=" text-md cursor-pointer"
                        />
                      </div>
                      <div className="font-bold text-lg">{`#trending ${i + 1}`}</div>
                      <div className="text-xs text-neutral-500">20.0k</div>
                    </div>
                  ))
                }
                <h4 className="text-md text-blue-400 p-4 cursor-pointer hover:bg-gray-800/90 last:rounded-b-2xl">Show more</h4>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}
