"use client";
import { CommentInterface } from "@/app/profile/[id]/page";
import useGetUserInfo from "@/helpers/useGetUserInfo";
import { useRouter } from "next/navigation";
import React from "react";
import { BsDot, BsThreeDots } from "react-icons/bs";

const Comment = ({
  content,
  image,
  timestamp,
  tweetId,
  userId,
  _id,
}: CommentInterface) => {
  const userInfo = useGetUserInfo(userId);
//   console.log(userInfo.profileInfo);
  const router = useRouter();
  return (
    <div className="w-[90%] flex ">
        
      <div className="w-full flex flex-col items-center">
        {/* comment header */}
        <div className="w-full flex items-center justify-evenly pr-1">
          <button
            className=" w-full flex items-center content-center"
            onClick={() => router.push("/profile")}
          >
            {/* avatar section */}
            <div className="w-10 h-10 m-2 bg-slate-600 rounded-full" />

            <p className="font-bold text-md">
              {userInfo.profileInfo.username || ""}
            </p>
            <p className="font-thin text-md mx-1">
              @{userInfo.profileInfo.username}
            </p>
            <div className="flex">
              <BsDot />
            </div>
            {/*  <p className="font-thin text-sm mx-1">{dayjs(tweet?.created_at).fromNow()}</p> */}
          </button>
          <div
            className="w-8 flex items-center
              rounded-full h-8  font-bold
              text-md justify-center hover:bg-blue-800/20 
              hover:text-blue-600
              transition duration-200 text-xl"
          >
            <BsThreeDots />
          </div>
        </div>
        <div
          className="w-[99%] flex flex-col items-start"
          /* onClick={} */
        >
          {/* twit text */}
          <div className=" text-white text-start text-sm my-2 pt-1 pl-1">
            {content}
          </div>
          {/* media content only displayed if it is sent*/}
          {/* <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl m-1"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Comment;
