"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


import { BsDot, BsThreeDots } from "react-icons/bs";
import dayjs from "dayjs";
import Link from "next/link";
import { CommentInterface } from "../app/(main)/profile/[id]/page";

const Comment = (tweet: CommentInterface) => {
  //comment user info
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    axios.get(`/api/users/info/${tweet?.userId}`).then((res) => {
      setUserInfo(res.data.profileInfo.username);
    });
  }, [tweet?.userId]);

  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-start p-4">
      <div className="w-[98%] flex flex-col items-center bg-slate-900 rounded-xl p-2">
        {/* comment header */}
        <div className="w-full flex items-center justify-evenly pr-1">
          <Link
            className=" w-full flex items-center content-center"
            href="/profile"
          >
            {/* avatar section */}
            <div className="w-10 h-10 m-2 bg-slate-600 rounded-full" />

            <p className="font-bold text-md">{userInfo}</p>
            <p className="font-thin text-md mx-1">@{userInfo}</p>
            <div className="flex">
              <BsDot />
            </div>
            <p className="font-thin text-sm mx-1">
              {dayjs(tweet?.timestamp).fromNow()}
            </p>
          </Link>
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
        <div className="w-[99%] flex flex-col items-start">
          {/* twit text */}
          <div className=" text-white text-start text-sm my-2 pt-1 pl-1">
            {tweet?.content}
          </div>
          {/* media content only displayed if it is sent*/}
          {/* <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl m-1"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Comment;
