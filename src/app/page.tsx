import { LeftSidebar, MainSection } from "@/components";



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
         <MainSection/>
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
