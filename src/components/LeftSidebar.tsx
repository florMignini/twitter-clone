import Link from "next/link";
import {BsThreeDots, BsTwitter} from 'react-icons/bs'
import { nav_items } from "../../data/navigation-items";

export const LeftSidebar = () => {
  return (
    <section className="fixed h-screen flex flex-col items-stretch justify-between text-xl">
   <div className="flex flex-col items-stretch justify-start">
   <Link href={'/'} className="px-3 text-3xl mb-1 mt-2">
        <BsTwitter/>
    </Link>
    {
      nav_items.map((nav_item)=>(
        <Link className="hover:bg-white/10 flex items-center w-fit h-fit justify-start space-x-5 rounded-3xl px-3 py-3"
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
   <button className="w-full flex items-center justify-around space-x-2 rounded-full py-2 hover:bg-white/10
   transition duration-200 p-1 my-4">
    <div className="rounded-full bg-slate-400 w-10 h-10">{/* Avatar */}</div>
    <div className="flex flex-col text-xs text-left">
      <div className="text-semibold">La_Florineta</div>
      <div>@mariflor_la</div>
    </div>
    <div className="text-sm text-right">
      <BsThreeDots/>
    </div>
   </button>
</section>
  )
}
