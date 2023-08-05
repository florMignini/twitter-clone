import Link from "next/link";
import {BsThreeDots, BsTwitter} from 'react-icons/bs'
import { nav_items } from "../../data/navigation-items";

export const LeftSidebar = () => {
  return (
    <section className="w-40 fixed h-screen lg:w-60 flex flex-col justify-between text-xl lg:py-2">
   <div className="w-[90%] items-start justify-center md:w-48 flex flex-col xl:items-stretch xl:justify-end">
   <Link href={'/'} className="px-3 mx-9 lg:m-0 text-3xl mb-1 lg:mb-2 mt-2">
        <BsTwitter/>
    </Link>
    {
      nav_items.map((nav_item)=>(
        <Link className="hover:bg-white/10 mx-auto md:mx-0 flex items-center w-fit h-fit justify-start space-x-5 rounded-3xl px-2 py-3 lg:py-4"
        href={`${nav_item.title.toLowerCase()}`}
        key={nav_item.title}
        >
          <div className="w-full mx-9 lg:mx-0 text-3xl">
          <nav_item.icon/>
        </div>
        <div className="hidden lg:flex md:min-w-full">{nav_item.title}</div>
        </Link>
      ))
    }
    <button className=" w-[60%] mx-5 sm:w-[70%] lg:mx-2 lg:w-full rounded-3xl bg-blue-500 py-2 text-xl hover:bg-opacity-70 transition duration-200 my-4">
      Tweet
    </button>
   </div>
      <button className="w-[90%] md:w-fit xl:w-48 flex items-center justify-around space-x-1 rounded-full lg:p-2 hover:bg-white/10
   transition duration-200 my-4">
    <div className="rounded-full bg-slate-400 w-10 h-10">{/* Avatar */}</div>
        <div className="hidden md:flex w-4/6 flex-col text-xs md:text-[14px] text-left">
          <div className="hidden md:flex md:font-semibold xl:font-bold">La_Florineta</div>
          <div className="hidden md:flex md:font-thin">@mariflor_la</div>
    </div>
        <div className="hidden md:flex md:text-sm text-right">
      <BsThreeDots/>
    </div>
   </button>
</section>
  )
}
