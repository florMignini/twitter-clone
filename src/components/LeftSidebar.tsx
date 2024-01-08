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
    <section className="px-1 w-[90%] md:w-[160px] lg:w-[190px] xl:w-[210px] lg:fixed h-screen my-2 rounded-xl flex flex-col justify-between text-xl lg:py-2 ">
      <div className="w-[90%] items-center justify-center flex flex-col mx-auto py-2">
        <Link
          href={"/"}
          className="w-[100%] flex items-center justify-center md:justify-start lg:mx-9 text-3xl mb-3 px-4 mt-2"
        >
          <Image src={xIcon} alt="xLogo" width={50} height={50}
          className="p-1 hover:bg-[#16181C] rounded-full"
          />
        </Link>
        <Link
            className="hover:bg-[#16181C] flex items-center w-[100%] h-fit justify-start space-x-5 rounded-3xl mx-auto px-4 py-3 lg:py-4"
            href={`/`}
            key="home"
          >
            <div className="w-[90%] mx-auto lg:mx-0 text-3xl">
              <AiOutlineHome />
            </div>
            <div className="hidden lg:flex md:min-w-full">Home</div>
          </Link>
        {nav_items.map((nav_item) => (
          <Link
            className="hover:bg-[#16181C] flex items-center w-[100%] h-fit justify-start space-x-5 rounded-3xl px-4 py-3 mx-auto lg:py-4"
            href={`/${nav_item.title.toLowerCase()}?profileId=${userQuery?._id}`}
            key={nav_item.title}
          >
            <div className="w-[90%] mx-auto lg:mx-0 text-3xl">
              <nav_item.icon />
            </div>
            <div className="hidden lg:flex md:min-w-full">{nav_item.title}</div>
          </Link>
        ))}
        <button className="flex items-center justify-center mx-0 w-[100%] lg:mx-2 rounded-3xl bg-blue-500 py-2 text-xl hover:bg-opacity-70 transition duration-200 my-4">
          Tweet
        </button>
      </div>
      <div className="w-[100%] flex flex-col">
        <Dropdown
        closeOnSelect={true}
        className="w-[90%] bg-black border-solid border-2 border-white"
        >
          <DropdownTrigger>
          <div
          className="w-[95%] flex items-center justify-center space-x-1 rounded-full mx-auto hover:bg-white/10
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
