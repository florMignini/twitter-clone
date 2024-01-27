'use client'
import Link from "next/link";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { BsTwitter } from "react-icons/bs";
import { nav_items } from "../../data/navigation-items";
import UserAvatar from "./UserAvatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useGetSessionData } from "@/helpers";
import { AiOutlineHome } from "react-icons/ai";
import { signOut } from "next-auth/react";
import xIcon from "@/assets/X_icon.png"
import Image from "next/image";

export const LeftSidebar = () => {
  const userQuery = useGetSessionData()
  const router = useRouter();
  const logOut = async () => {
    try {
      const logout = await axios.get('/api/users/logout')
      signOut()
      router.refresh()
      router.push('/signin')
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <section className="px-1 w-[100px] lg:w-[210px] fixed h-screen my-2 rounded-xl flex flex-col justify-between text-xl lg:py-2 ">
      <div className="w-[100%] md:w-[80%] items-center justify-center flex flex-col mx-auto py-2">
        <Link
          href={"/"}
          className="flex items-center md:w-[80%] w-[90%] h-fit lg:mx-auto justify-start lg:space-x-5 rounded-3xl md:rounded-full px-2 py-2 lg:py-3"
        >
          <Image src={xIcon} alt="xLogo" width={50} height={50}
          className="flex mx-auto hover:bg-[#16181C] rounded-full"
          />
        </Link>
        <Link
            className="lg:w-[90%] hover:bg-[#16181C] flex items-center md:w-[70%] lg:mx-auto h-fit justify-start lg:space-x-3 rounded-3xl md:rounded-full px-2 py-2 lg:py-3"
            href={`/`}
            key="home"
          >
            <div className=" w-[90%] mx-auto lg:mx-0 text-3xl">
              <AiOutlineHome />
            </div>
            <div className="hidden w-fit lg:flex md:min-w-full">Home</div>
          </Link>
        {nav_items.map((nav_item) => (
          <Link
            className="lg:w-[100%] hover:bg-[#16181C] flex items-center md:w-[70%] h-fit justify-start lg:space-x-3 rounded-3xl md:rounded-full lg:mx-auto px-2 lg:py-3 py-2"
            href={`/${nav_item.title.toLowerCase()}?profileId=${userQuery?._id}`}
            key={nav_item.title}
          >
            <div className="w-[90%] mx-auto lg:mx-0 text-3xl">
              <nav_item.icon />
            </div>
            <div className="hidden w-[100%] lg:flex md:min-w-full">{nav_item.title}</div>
          </Link>
        ))}
        <button className="w-[90%] flex items-center justify-center mx-0 lg:mx-2 md:mx-1 rounded-3xl bg-blue-500 py-2 text-xl hover:bg-opacity-70 transition duration-200 my-4">
          Tweet
        </button>
      </div>
      <div className="w-[90%] mx-auto flex flex-col">
        <Dropdown
        closeOnSelect={true}
        className="w-[90%] mx-auto bg-black border-solid border-2 border-white">
          <DropdownTrigger>
          <div
          className="w-[100%] flex items-center justify-center space-x-1 rounded-full mx-auto lg:hover:bg-white/10
   transition duration-200 my-5 cursor-pointer"
        >
          <UserAvatar />
        </div>
          </DropdownTrigger>
          <DropdownMenu
            className=" text-white">
            <DropdownItem
            >
              <Link
              href={'/logout'}
              onClick={logOut}
              >
              Log out
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </section>
  );
};
