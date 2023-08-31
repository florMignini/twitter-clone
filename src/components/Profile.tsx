"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Profile } from "../../interfaces";
import { BiArrowBack } from "react-icons/bi";
import { Avatar } from "@nextui-org/react";

const Profile = () => {
  const [userSessionData, setUserSessionData] = useState<Profile | null>(null);
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/users/profile").then((userData) => {
      setUserSessionData(userData.data.profileInfo);
      console.log(userData.data.profileInfo);
    });
  }, [userSessionData]);

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
        <h1 className="text-2xl font-semibold">{userSessionData?.username}</h1>
        </div>
        {/* user section */}
        <div
        className="w-[100%] h-[100%] flex flex-col items-center justify-between"
        >
          {/* front page */}
          <div className="w-[100%] h-[70%] bg-slate-600 relative">
            <Avatar
            src="https://avatars.githubusercontent.com/u/30373425?v=4"
            className="w-[20%] h-[70%] lg:w-[15%] 
            xl:w-[25%]
            xl:h-[90%] absolute bottom-[-15%] left-3"
            />
          </div>
        </div>
        <div className="w-[100%] h-[100%] relative">
        <div className="absolute top-0 left-2">
            <h3 className="text-xl">{userSessionData?.username}</h3>
            <p className="font-thin">{`@${userSessionData?.username}`}</p>
            </div>
        </div>
        {/* user twitter section */}
    </div>
  );
};

export default Profile;
