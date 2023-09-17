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
    <section className="w-50 fixed h-screen lg:w-60 flex flex-col justify-between text-xl lg:py-2">
      <div className="w-[90%] items-start justify-center md:w-48 flex flex-col xl:items-stretch xl:justify-end">
        <Link
          href={"/"}
          className="px-3 mx-9 lg:m-0 text-3xl mb-1 lg:mb-2 mt-2"
        >
          <BsTwitter />
        </Link>
        {nav_items.map((nav_item) => (
          <Link
            className="hover:bg-white/10 md:mx-0 flex items-center w-[60%] lg:w-[90%] h-fit justify-start space-x-5 rounded-3xl px-2 py-3 lg:py-4"
            href={`/${nav_item.title.toLowerCase()}`}
            key={nav_item.title}
          >
            <div className="w-full mx-9 lg:mx-0 text-3xl">
              <nav_item.icon />
            </div>
            <div className="hidden lg:flex md:min-w-full">{nav_item.title}</div>
          </Link>
        ))}
        <button className=" w-[50%] mx-2 sm:w-[60%] lg:mx-2 lg:w-[90%] x:w-[100%] rounded-3xl bg-blue-500 py-2 text-xl hover:bg-opacity-70 transition duration-200 my-4">
          Tweet
        </button>
      </div>
      <div className="w-[90%] flex flex-col">
        <Dropdown
        closeOnSelect={true}
        className="w-[90%] bg-black border-solid border-2 border-white"
        >
          <DropdownTrigger>
          <div
          className="w-[90%] md:w-[90%] xl:w-48 flex items-center justify-around space-x-1 rounded-full lg:p-1 hover:bg-white/10
   transition duration-200 my-4 cursor-pointer"
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
