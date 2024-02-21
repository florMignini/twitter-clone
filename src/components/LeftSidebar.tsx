"use client";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { BsTwitter } from "react-icons/bs";
import { nav_items } from "../../data/navigation-items";

import { useGetSessionData } from "@/helpers";
import { AiOutlineHome } from "react-icons/ai";

import xIcon from "@/assets/X_icon.png";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export const LeftSidebar = () => {
  const userQuery = useGetSessionData();

  const router = useRouter();

  return (
    <section className="px-1 md:w-[115px] lg:w-[196px] xl:w-[243px] fixed h-screen flex flex-col justify-between text-xl border-r-1 border-zinc-700">
      <div className="w-[100%] items-center justify-end flex flex-col py-2">
        <Link
          href={"/"}
          className="flex items-center w-[100%] h-fit lg:mx-auto justify-start lg:space-x-5 rounded-3xl md:rounded-full py-2 lg:py-3"
        >
          <Image
            src={xIcon}
            alt="xLogo"
            width={50}
            height={50}
            className="flex hover:bg-[#16181C] rounded-full"
          />
        </Link>
        <Link
          className="w-[40%] lg:w-[90%] hover:bg-[#16181C] flex items-center md:w-[70%] lg:mx-auto h-fit justify-start lg:space-x-3 rounded-3xl md:rounded-full py-2 lg:py-3"
          href={`/`}
          key="home"
        >
          <div className=" w-[90%] mx-auto lg:mx-0 text-3xl">
            <AiOutlineHome />
          </div>
          <div className="hidden w-auto xl:flex md:min-w-full">Home</div>
        </Link>
        {nav_items.map((nav_item) => (
          <Link
            className="w-[40%] lg:w-[90%] hover:bg-[#16181C] flex items-center md:w-[70%] h-fit justify-start lg:space-x-3 rounded-3xl md:rounded-full lg:mx-auto lg:py-3 py-2"
            href={`/${nav_item.title.toLowerCase()}?profileId=${
              userQuery?._id
            }`}
            key={nav_item.title}
          >
            <div className="w-[90%] mx-auto lg:mx-0 text-3xl">
              <nav_item.icon />
            </div>
            <div className="hidden w-fit xl:flex md:min-w-full">
              {nav_item.title}
            </div>
          </Link>
        ))}
        <div className="w-[100%] xl:w-[90%] flex items-center justify-start">
        <button className="w-auto xl:w-[100px] px-3 flex items-center justify-center mx-0 xl:mx-2 md:mx-1 rounded-3xl bg-blue-500 py-2 text-xl hover:bg-opacity-70 transition duration-200 my-4">
          Tweet
        </button>
        </div>
      </div>
      {userQuery ? (
        <div
          className="w-[90%] flex items-center justify-center space-x-3 rounded-full mx-auto lg:hover:bg-white/10
   transition duration-200 my-3 p-2 cursor-pointer"
        >
          <UserButton afterSignOutUrl="/" />
          <div className="text-xs capitalize flex flex-col">
            <p className="font-semibold">{userQuery?.username}</p>
            <p className="font-thin">{`@${userQuery?.username}`}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
};
