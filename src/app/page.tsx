import { LeftSidebar } from "@/components/LeftSidebar";


export default function Home() {
  return (
   <div className="w-full h-full justify-center items-center relative bg-black">
      <div className="max-w-screen-xl w-full h-full flex relative px-12">
        {/* Sidebar and notification section */}
        <LeftSidebar/>
        {/* 
        <main>
        Main content ---> Twitts
        </main>

        // this section disapears on mobile screens
        <section classname="none lg:w-52 h-screen lg:fixed lg:flex bg-slate-400 " >
        follow and news section
        </section>
        */}
      </div>
   </div>
  )
}
