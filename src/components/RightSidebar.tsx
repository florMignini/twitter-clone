import { BsSearch, BsThreeDots } from "react-icons/bs";

export const RightSidebar = () => {
  return (
    <section className="hidden xl:flex xl:fixed top-2 overflow-visible flex-col px-5 my-4" >
      {/* Search bar section */}
      <div className="sticky h-15 top-0 rounded-full bg-slate-900 backdrop-blur-lg text-gray-600 mt-1">
        <div className="h-full w-full relative grid grid-cols-[10%,90%] gap-4 p-3 text-sm">
          <label
            htmlFor="searchItem"
            className="flex items-center justify-center">
            <BsSearch className="w-5 h-5" />
          </label>
 
            <input
              type="text"
              placeholder="Search Twitter"
              className="bg-transparent outline-none flex border-none items-center justify-center
                  w-full
                  "
            />
    
        </div>
      </div>
      {/* Who to Follow */}
      <div className="w-fill flex flex-col rounded-2xl  bg-slate-900 mt-2">
        <h3 className="text-xl font-bold py-3 px-4">Who to Follow</h3>
        <div>
          {
            Array.from({ length: 3 }).map((_, i) => (
              <button className="w-full my-2 flex items-center justify-between space-x-1 px-3 py-1 hover:bg-white/10
                    transition duration-200">
                <div className="flex">
                  <div className="rounded-full bg-slate-400 w-10 h-10 mx-2">{/* Avatar */}</div>
                  <div className="flex w-2/3 flex-col text-left text-xs lg:text-[14px] ">
                    <div className="font-semibold lg:font-bold">La_Florineta</div>
                    <div className="lg:font-thin ">@mariflor_la</div>
                  </div>
                </div>
                <button className="w-1/3 flex items-center justify-center mr-2 px-5 py-1 bg-white rounded-2xl text-sm font-semibold text-black hover:opacity-80 lg:mb-2">
                  Follow
                </button>
              </button>
            ))
          }
          <h4 className="text-md text-blue-400 p-4 cursor-pointer hover:bg-gray-800/90 last:rounded-b-2xl">Show more</h4>
        </div>
      </div>
      {/* What's happening */}
      <div className="flex flex-col rounded-2xl  bg-slate-900 mt-4">
        <h3 className="text-xl font-bold p-4">What's happening</h3>
        <div>
          {
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="hover:bg-white/10 transition duration-200 p-3 w-full m-auto"
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
  )
}
