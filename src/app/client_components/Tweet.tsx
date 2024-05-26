"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useTweet } from "@/context";
import { BsBookmarkFill, BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoMdStats } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";

// dayjs import
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useGetSessionData } from "@/helpers";
import Link from "next/link";
import { tweetComponent, Tweet as tweetType } from "../../../interfaces";

import Image from "next/image";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

dayjs.extend(relativeTime);
export interface Like {
  timestamp: string;
  tweetId: string;
  userId: string;
  _id: string;
}

export const Tweet = ({ tweet, component }: tweetComponent) => {
  const router = useRouter();
  //bringing user session data && login session
  const userQuery = useGetSessionData();
  //tweet provider imports
  const {
    //actions
    likeTweet,
    unLikeTweet,
    addBookmark,
    deleteBookmark,

    //states
    bookmarksByUser,
  }: any = useTweet();

  //bring the userId from session like if it exist
  const likesResult = useMemo(
    () =>
      tweet?.likes?.filter((like: Like) => like.userId === userQuery?._id)[0],
    [tweet, userQuery?._id]
  );
console.log(tweet);

  const bookmarksTweetId = useMemo(
    () =>
      bookmarksByUser?.map((bookmark: any) => {
        return bookmark?.tweets?.map((element: any) =>
          element._id ? element._id : element
        );
      }),
    [bookmarksByUser]
  );

  const handleLikeTweet = async (
    userId: string,
    tweetId: string,
    action: string
  ) => {
    if (action === "unlike") {
      await unLikeTweet({ userId, tweetId });
    }
    if (action === "like") {
      await likeTweet({ userId, tweetId });
    }
  };

  const handleBookmark = async (
    userId: string,
    tweetId: string,
    action: string
  ) => {
    if (action === "addBookmark") {
      await addBookmark({ userId, tweetId });
    }
    if (action === "deleteBookmark") {
      await deleteBookmark({ userId, tweetId });
    }
  };

  const addView = async (userId: string, tweetId: string) => {
    await axios.post("/api/tweets/addView", { userId, tweetId });
  };

  //Follow action
  const follow = async (userToFollowId: string | undefined, userId: string) => {
    await axios.post("/api/users/following", { userToFollowId, userId });
  };

  return (
    <button
      key={tweet?._id}
      className="w-[95%] relative grid grid-cols-[8%_92%] gap-2
      bg-[#16181C] rounded-xl p-3 my-3
      "
    >
      {/* user image */}

      <Image
        width={50}
        height={50}
        className="rounded-full flex items-center justify-center"
        alt="userAvatar"
        src={
          tweet?.userId?.imageUrl
            ? tweet?.userId?.imageUrl
            : userQuery?.imageUrl
        }
      />

      {/* avatar section */}
      <div>
        <div className=" flex flex-col items-center">
          {/* tweet header */}
          <div className="w-full flex items-center justify-evenly pr-1">
            <Link
              className=" w-full flex items-center content-center"
              href={`/profile?profileId=${tweet?.userId?._id}`}
            >
              <p className="font-bold text-md">
                {tweet?.userId?.username || userQuery?.username}
              </p>
              <p className="font-thin text-md mx-1">
                @{tweet?.userId?.username || userQuery?.username}
              </p>
              <div className="flex">
                <BsDot />
              </div>
              <p className="font-thin text-sm mx-1">
                {/* {dayjs(tweet?.timestamp).fromNow(true)} */}
                {dayjs().to(dayjs(tweet?.timestamp))}
              </p>
            </Link>
            {/* follow button section */}

            <Dropdown
              closeOnSelect={true}
              className="w-[40%] bg-slate-900 border-solid border-2 "
            >
              <DropdownTrigger>
                <div
                  className="w-8 flex items-center
              rounded-full h-8  font-bold
              text-md justify-center hover:bg-blue-800/20 
              hover:text-blue-600
              transition duration-200 z-0 text-xl"
                >
                  <BsThreeDots />
                </div>
              </DropdownTrigger>
              {tweet?.userId?._id !== userQuery?._id ? (
                <DropdownMenu className=" text-white">
                  <DropdownItem
                    onClick={() => follow(tweet?.userId?._id, userQuery?._id)}
                  >
                    Follow {tweet?.userId?.username}
                  </DropdownItem>
                </DropdownMenu>
              ) : null}
            </Dropdown>
          </div>

          {/* twit text */}
          <Link
            href={`/profile/${tweet?._id}`}
            className="w-[99%] flex flex-col items-start text-white text-start text-sm my-2 p-1 pl-1"
          >
            <button
              className="p-2"
              onClick={() => {
                addView(userQuery._id, tweet?._id as string);
              }}
            >
              {tweet?.content}
            </button>

            {/* media content only displayed if it exist*/}
            {tweet?.image
              ? tweet.userImage && (
                  <Image
                    src={tweet?.image!}
                    alt="tweetImage"
                    width={550}
                    height={550}
                    className="rounded-2xl"
                  />
                )
              : null}
          </Link>
        </div>
        {/* bottom icons */}
        <div className="flex items-center justify-around space-x-2 w-full cursor-pointer">
          {/* comment button */}
          {component === "home" ? (
            <Link
              href={`/profile/${tweet?._id}?showModal=y`}
              className="flex 
        rounded-full h-8 w-8  font-bold
        text-md
items-center justify-center hover:bg-blue-800/20 
        hover:text-blue-600
        transition duration-200
        "
            >
              <BsChat />
              {tweet?.comments && tweet?.comments?.length > 0 ? (
                <p className="ml-1 text-xs">{tweet?.comments?.length}</p>
              ) : (
                " "
              )}
            </Link>
          ) : null}
          {/* retweet button */}
          <div
            className="flex items-center justify-center 
            font-bold
            transition duration-200
            text-md
            p-1
            hover:bg-green-400/20
          hover:text-green-600
          rounded-full h-8 w-8"
          >
            <AiOutlineRetweet />
          </div>
          {/* like button */}
          <div
            className="flex items-center justify-center
            font-bold
            transition duration-200
            text-md
            p-1
            hover:bg-red-400/20
          hover:text-red-600
          rounded-full h-8 w-8"
          >
            {likesResult ? (
              <button
                className="flex items-center justify-center gap-1 text-red-500"
                onClick={() => {
                  handleLikeTweet(
                    userQuery._id,
                    tweet?._id as string,
                    "unlike"
                  );
                }}
              >
                <AiFillHeart />
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLikeTweet(userQuery._id, tweet?._id as string, "like");
                }}
              >
                <AiOutlineHeart />
              </button>
            )}
            {tweet?.likes && tweet?.likes?.length > 0 ? (
              <p className="ml-1 text-xs">{tweet.likes?.length}</p>
            ) : (
              ""
            )}
          </div>
          <div
            className="flex items-center justify-center 
        font-bold
        transition duration-200
        text-md
        p-1
        hover:bg-blue-400/20
      hover:text-blue-600
      rounded-full h-8 w-8"
          >
            {tweet?.views && tweet?.views.length > 0 ? (
              <>
                <IoMdStats />
                <p className="ml-1 text-xs">{tweet?.views.length}</p>
              </>
            ) : (
              <IoMdStats />
            )}
          </div>
          {bookmarksTweetId && bookmarksTweetId[0]?.includes(tweet?._id) ? (
            <button
              onClick={() => {
                handleBookmark(
                  userQuery._id,
                  tweet?._id as string,
                  "deleteBookmark"
                );
              }}
              className="flex items-center justify-center 
            font-bold
            transition duration-200
            text-md
            hover:bg-blue-400/20
          hover:text-blue-600
          rounded-full h-8 w-8"
            >
              <BsBookmarkFill />
            </button>
          ) : (
            <button
              onClick={() => {
                handleBookmark(
                  userQuery._id,
                  tweet?._id as string,
                  "addBookmark"
                );
              }}
              className="flex items-center justify-center 
            font-bold
            transition duration-200
            text-md
            hover:bg-blue-400/20
          hover:text-blue-600
          rounded-full h-8 w-8"
            >
              <BsBookmark />
            </button>
          )}
        </div>
      </div>
      {/* twitt content */}
    </button> //twitt container
  );
};
