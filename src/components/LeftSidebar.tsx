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
import { HomeIcon } from "@/icons";

export const LeftSidebar = () => {
  const userQuery = useGetSessionData();

  const router = useRouter();

  return (
    <section className="w-[60px] px-1 pb-4 md:w-[110px] lg:w-[196px] xl:w-[243px] fixed h-full flex flex-col justify-between text-xl">
      <div className="w-[100%] items-center justify-start flex flex-col ">
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
       <div className="w-[100%] flex items-center h-fit justify-start">
       <Link
          className="w-[50px] lg:w-auto flex items-center h-[50px] lg:h-fit justify-start lg:justify-center space-x-1 rounded-3xl md:rounded-full px-2 lg:px-6 lg:py-3 hover:bg-[#16181C] text-white"
          href={`/`}
          key="home"
        >
          <div className="mx-auto lg:mx-0">
          <HomeIcon/>
          </div>
          <h5 className="hidden w-auto px-2 lg:flex md:min-w-full">Home</h5>
        </Link>
       </div>
       {nav_items.map((nav_item) => (
       <div className="w-[100%] flex items-center h-fit justify-start"
       key={nav_item.title}
       >
          <Link
            className="w-fill lg:w-auto flex items-center h-[50px] lg:h-fit justify-start lg:justify-center space-x-1 rounded-3xl md:rounded-full lg:px-6 lg:py-3 hover:bg-[#16181C] text-white"
            href={`/${nav_item.title.toLowerCase()}?profileId=${
              userQuery?._id
            }`}
            
          >
            <div className="mx-auto lg:mx-0">
              <nav_item.icon />
            </div>
            <h5 className="hidden w-fill px-0 lg:px-2 lg:flex md:min-w-full">{nav_item.title}</h5>
          </Link>
       </div>
        ))}
        <div className="w-[100%] xl:w-[90%] flex items-center justify-start">
          <div className=" lg:w-[90%] flex items-center justify-start">
          <button className="w-[80%] md:w-auto xl:w-[100px] px-3 flex items-center justify-center mx-0 xl:mx-2 md:mx-1 rounded-3xl bg-blue-500 py-2 text-base font-bold md:font-normal md:text-xl hover:bg-opacity-70 transition duration-200 my-4">
            Tweet
          </button>
          </div>
        </div>
      </div>
      {userQuery ? (
        <div
          className="w-[90%] flex items-center justify-center lg:justify-start space-x-3 rounded-full mx-auto lg:hover:bg-white/10
   transition duration-200 p-2 cursor-pointer"
        >
          <UserButton afterSignOutUrl="/" />
          <div className="hidden text-xs capitalize md:flex flex-col">
            <p className="font-semibold">{userQuery?.username}</p>
            <p className="font-thin">{`@${userQuery?.username}`}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
};
