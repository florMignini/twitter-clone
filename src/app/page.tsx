import { LeftSidebar } from "@/components/LeftSidebar";


export default function Home() {
  return (
    <div className="w-full h-full justify-center items-center relative bg-black">
      <div className=" w-full h-full grid grid-cols-4 gap-2 relative px-12 mr-auto">
        {/* Sidebar and notification section */}
        <div className="">
          <LeftSidebar />
        </div>
        {/* Main content ---> Twitts */}
        <div className="col-span-2">
          <main className="w-full h-full min-h-screen border-l-[0.3px] border-r-[0.3px] border-gray-600">
            <h1 className="text-2xl font-bold p-4">Home</h1>
            <div className="border-b-[0.3px] border-t-[0.3px] border-gray-600 h-32 relative grid grid-cols-[8%_92%] gap-1">
              {/* Avatar */}

             <div className="w-10 h-10 rounded-full bg-slate-400 m-4"></div>

              {/* Input */}
              <div className="">
                {/* input & everyone can reply section*/}
                 <div className="h-62  border-b-[0.3px]  border-gray-600 mx-1">
                  <div>{/*  border-gray-600 */}</div>
                 <input type="text" placeholder="What's happening?!"
                    className=" w-full h-62 bg-transparent outline-none border-none border-b-[0.5px] px-2 text-2xl font-light"
                  />
                 </div>
                  <div>{/* everyone can reply */}</div>
                <div className=" w-full justify-between items-center flex">
                  <div></div>
                  <div className="px-2 py-4">
                    <button className="w-full rounded-3xl bg-blue-600 py-1 px-4 text-md hover:bg-opacity-70 transition duration-200">
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* this section disapears on mobile screens */}
        <div className="none ">
          <section className="" >
            follow and news section
          </section>
        </div>

      </div>
    </div>
  )
}
