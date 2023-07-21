import Link from "next/link";
import {BsTwitter} from 'react-icons/bs'
import { nav_items } from "../../data/navigation-items";

export default function Home() {
  return (
   <div className="w-full h-full justify-center items-center relative bg-black">
      <div className="max-w-screen-xl w-full h-full flex relative px-12">
        {/* Sidebar and notification section */}
        <section className="fixed w-62 flex flex-col h-screen my-4 text-xl space-y-4">
            <Link href={'/'} className="px-3 text-3xl">
                <BsTwitter/>
            </Link>
            {
              nav_items.map((nav_item)=>(
                <Link className="flex items-center w-fit justify-start space-x-5 rounded-xl px-3 py-2"
                href={`${nav_item.title.toLowerCase()}`}
                key={nav_item.title}
                >
                <div className="text-3xl">
                  <nav_item.icon/>
                </div>
                <div>{nav_item.title}</div>
                </Link>
              ))
            }
            <button className="w-full rounded-3xl bg-blue-500 py-2 text-xl hover:bg-opacity-70 transition duration-200">
              Tweet
            </button>
        </section>
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
