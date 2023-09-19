'use client'
import Link from "next/link";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { nav_items } from "../../data/navigation-items";
import UserAvatar from "./UserAvatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

export const LeftSidebar = () => {
  const router = useRouter();
  const logOut = async () => {
    try {
      const logout = await axios.get('/api/users/logout')
      router.push('/signin')
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <section className="w-[20%] md:w-[150px] lg:w-[190px] fixed h-screen my-2 rounded-xl flex flex-col justify-between text-xl lg:py-2 bg-slate-400/10">
      <div className="md:w-[90%] items-center justify-center flex flex-col mx-auto py-2">
        <Link
          href={"/"}
          className="px-3 mx-9 lg:m-0 text-3xl mb-3 lg:mb-2 mt-2"
        >
          <BsTwitter />
        </Link>
        {nav_items.map((nav_item) => (
          <Link
            className="hover:bg-slate-900 flex items-center w-[90%] h-fit justify-start space-x-5 rounded-3xl px-2 py-3 lg:py-4"
            href={`/${nav_item.title.toLowerCase()}`}
            key={nav_item.title}
          >
            <div className="w-full mx-9 lg:mx-0 text-3xl">
              <nav_item.icon />
            </div>
            <div className="hidden lg:flex md:min-w-full">{nav_item.title}</div>
          </Link>
        ))}
        <button className="flex items-center justify-center mx-0 w-[70%] lg:mx-2 rounded-3xl bg-blue-500 py-2 text-xl hover:bg-opacity-70 transition duration-200 my-4">
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
          className="w-[100%] flex items-center justify-around space-x-1 rounded-full hover:bg-white/10
   transition duration-200 my-5 cursor-pointer"
        >
          <UserAvatar />
        </div>
          </DropdownTrigger>
          <DropdownMenu
            className=" text-white">
            <DropdownItem
             onClick={logOut}
            >Log out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </section>
  );
};
