import React from "react";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { LikeInterface, Profile } from "../../interfaces";
import dayjs from "dayjs";
import Link from "next/link";
import { AiOutlineRetweet, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoMdStats } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export interface bookmark_type {
  _id: string;
  content: string;
  image?: string;
  userId: Profile;
  likes: LikeInterface[];
  comments: Comment[];
  timestamp: string;
}

const Bookmark = (bookmark: any) => {

  const searchParams = useSearchParams();
  const profileId = searchParams?.get("profileId");
  return (
    <div
      className="w-[95%] relative grid grid-cols-[8%_92%] gap-2
bg-slate-900 rounded-xl p-3 my-3
"
    >
      <div>
        <div className="w-10 h-10 bg-slate-600 rounded-full" />
      </div>{" "}
      {/* avatar section */}
      <div>
        <div className=" flex flex-col items-center">
          {/* tweet header */}
          <div className="w-full flex items-center justify-evenly pr-1">
            <Link
              className=" w-full flex items-center content-center"
              href={`/profile?profileId=${bookmark?.userId._id}`}
            >
              <p className="font-bold text-md">
                {bookmark?.userId?.username || ""}
              </p>
              <p className="font-thin text-md mx-1">
                @{bookmark?.userId?.username}
              </p>
              <div className="flex">
                <BsDot />
              </div>
              <p className="font-thin text-sm mx-1">
                {dayjs(bookmark?.timestamp).fromNow()}
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

          {/* twit text */}
          <Link
            href={`/profile/${bookmark?._id}`}
            className="w-[99%] flex flex-col items-start text-white text-start text-sm my-2 pt-1 pl-1"
          >
            {bookmark?.content}

            {/* media content only displayed if it exist*/}
            {bookmark?.image ? (
              <Image
                src={bookmark?.image!}
                alt="tweetImage"
                width={550}
                height={550}
                className="rounded-2xl"
              />
            ) : null}
          </Link>
        </div>
        <div className="flex items-center justify-around space-x-2 w-full cursor-pointer">
          <Link
            href={`/profile/${bookmark?._id}?showModal=y`}
            className="flex 
  rounded-full h-8 w-8  font-bold
  text-md
items-center justify-center hover:bg-blue-800/20 
  hover:text-blue-600
  transition duration-200
  "
          >
            <BsChat />
            {bookmark?.comments?.length > 0 ? (
              <p className="ml-1 text-xs">{bookmark?.comments?.length}</p>
            ) : (
              " "
            )}
          </Link>
          <div
            className="flex items-center justify-center 
    font-bold
    transition duration-200
    text-md
    hover:bg-green-400/20
  hover:text-green-600
  rounded-full h-8 w-8"
          >
            <AiOutlineRetweet />
          </div>
          <div
            className="flex items-center justify-center
    font-bold
    transition duration-200
    text-md
    hover:bg-red-400/20
  hover:text-red-600
  rounded-full h-8 w-8"
          >
            {bookmark.likes.length > 0 ? (
              <div className="flex items-center justify-center gap-1 text-red-500">
                <AiFillHeart />
              </div>
            ) : (
              <div>
                <AiOutlineHeart />
              </div>
            )}
            {bookmark?.likes?.length > 0 ? (
              <p className="ml-1 text-xs">{bookmark.likes?.length}</p>
            ) : (
              ""
            )}
          </div>
          <div
            className="flex items-center justify-center 
    font-bold
    transition duration-200
    text-md
    hover:bg-blue-400/20
  hover:text-blue-600
  rounded-full h-8 w-8"
          >
            <IoMdStats />
          </div>
        </div>
        {/* bottom icons */}
      </div>
      {/* twitt content */}
    </div> //twitt container
  );
};

export default Bookmark;
