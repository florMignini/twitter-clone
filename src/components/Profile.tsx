'use client'
import { BiArrowBack } from "react-icons/bi";
import { Avatar } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useGetSessionData from "@/helpers/useGetSessionData";


const Profile = () => {
const router = useRouter()
const userQuery = useGetSessionData()

// console.log(userQuery.data?.data.profileInfo)

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="sticky w-[100%] h-[10%] flex items-start justify-start py-1 px-2">
        {/* top section */}
        <button 
        className="w-5 h-10 mr-4 cursor-pointer"
        onClick={() => router.back()}>
          <BiArrowBack 
          className='w-5 h-5'
          />
        </button>
        <h1 className="text-2xl font-semibold">{userQuery.data?.data.profileInfo.username}</h1>
        </div>
        {/* user section */}
        <div
        className="w-[100%] h-[100%] flex flex-col items-center justify-between"
        >
          {/* front page */}
          <div className="w-[100%] h-[70%] bg-slate-600 relative">
            <Avatar
            src="https://avatars.githubusercontent.com/u/30373425?v=4"
            className="w-[35%] h-[55%] lg:w-[25%] lg:h-[65%]
            xl:w-[40%]
            xl:h-[70%] absolute bottom-[-15%] left-3"
            />
          </div>
        </div>
        <div className="w-[100%] h-[100%] relative">
        <div className="absolute top-0 left-2">
            <h3 className="text-xl">{userQuery.data?.data.profileInfo.username}</h3>
            <p className="font-thin">{`@${userQuery.data?.data.profileInfo.username}`}</p>
            </div>
        </div>
        {/* user twitter section */}
    </div>
  );
};

export default Profile;
