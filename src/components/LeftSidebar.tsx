import Link from "next/link";
import {BsThreeDots, BsTwitter} from 'react-icons/bs'
import { nav_items } from "../../data/navigation-items";

export const LeftSidebar = () => {
  return (
    <section className="fixed h-screen w-60 flex flex-col justify-between text-xl   lg:py-2">
   <div className="flex flex-col items-stretch justify-end">
   <Link href={'/'} className="px-3 text-3xl mb-1 lg:mb-2 mt-2">
        <BsTwitter/>
    </Link>
    {
      nav_items.map((nav_item)=>(
        <Link className="hover:bg-white/10 flex items-center w-fit h-fit justify-start space-x-5 rounded-3xl px-2 py-3 lg:py-4"
        href={`${nav_item.title.toLowerCase()}`}
        key={nav_item.title}
        >
        <div className="text-3xl">
          <nav_item.icon/>
        </div>
        <div className="none md:min-w-full">{nav_item.title}</div>
        </Link>
      ))
    }
    <button className="w-full rounded-3xl bg-blue-500 py-2 text-xl hover:bg-opacity-70 transition duration-200 my-4">
      Tweet
    </button>
   </div>
   <button className="w-full flex items-center justify-around space-x-1 rounded-full p-2 hover:bg-white/10
   transition duration-200 my-4">
    <div className="rounded-full bg-slate-400 w-10 h-10">{/* Avatar */}</div>
    <div className="flex w-4/6 flex-col text-xs lg:text-[14px] text-left">
      <div className="font-semibold lg:font-bold">La_Florineta</div>
      <div className="lg:font-thin">@mariflor_la</div>
    </div>
    <div className="text-sm text-right">
      <BsThreeDots/>
    </div>
   </button>
</section>
  )
}
