"use client";
import { BiArrowBack } from "react-icons/bi";
import { Avatar } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useGetSessionData from "@/helpers/useGetSessionData";
import useGetUserInfo from "@/helpers/useGetUserInfo";

const Profile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const profileId = searchParams.get("profileId");

  const profileInfoQuery = useGetUserInfo(profileId!);
  const profileInfo = profileInfoQuery?.profileInfo;

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="sticky w-[100%] h-[10%] flex items-start justify-start py-1 px-2">
        {/* top section */}
        <button
          className="w-5 h-10 mr-4 cursor-pointer"
          onClick={() => router.back()}
        >
          <BiArrowBack className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold">{profileInfo?.username}</h1>
      </div>
      {/* user section */}
      <div className="w-[100%] h-[50%] flex flex-col items-center justify-between">
        {/* front page */}
        <div className="w-[100%] h-[90%] bg-slate-600 relative">
          <Avatar
            src="https://avatars.githubusercontent.com/u/30373425?v=4"
            className="w-[25%] h-[65%] lg:w-[25%] lg:h-[65%]
            xl:w-[40%]
            xl:h-[70%] absolute bottom-[-15%] left-3"
          />
        </div>
      </div>
      <div className="w-[100%] h-[40%] relative">
        <div className="absolute top-10 left-2">
          <h3 className="text-xl">{profileInfo?.username}</h3>
          <p className="font-thin">{`@${profileInfo?.username}`}</p>
        </div>
      </div>
      {/* user twitter section */}
    </div>
  );
};

export default Profile;
