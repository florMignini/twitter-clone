"use client";
import useGetBookmarks from "@/helpers/useGetBookmarks";
import React, { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import Bookmark, { bookmark_type } from "../../components/Bookmark";
import Link from "next/link";
import { useGetSessionData } from "@/helpers";
import { TailSpin } from "react-loader-spinner";
import { useTweet } from "@/context";
import { Tweet as tweetType } from "../../../interfaces";
import { Tweet } from "../client_components/Tweet";

const Bookmarks = () => {

  
  const user = useGetSessionData();
  const {bookmarksByUser, getAllTweetsByUser, loading}:any = useTweet()
  useEffect(() => {
    getAllTweetsByUser(user?._id)
  }, [])


  return (
    <div className="w-full pl-2 bg-black h-full min-h-screen border-l-[0.1px] border-r-[0.1px] border-slate-700 mx-1">
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <TailSpin
            height="40"
            width="40"
            color="#319bf0"
            radius="1"
            visible={true}
          />
        </div>
      ) : (
        <>
          <header className="w-[95%] flex items-center justify-between mb-2 p-1">
            <div className="w-[80%]">
              <h3 className="text-2xl font-semibold">Bookmarks</h3>
              <Link href={`/profile?profileId=${user?._id}`}>
                <h4 className="font-thin">@{user?.username}</h4>
              </Link>
            </div>
            <button
              className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer hover:bg-slate-400/20
               rounded-full"
              onClick={() => console.log(`clear all bookmarks`)}
            >
              <BsThreeDots />
            </button>
          </header>
          {bookmarksByUser[0]?.tweets?.map((tweet: tweetType) => (
            <Tweet key={tweet._id} {...tweet} />
          ))}
        </>
      )}
    </div>
  );
};

export default Bookmarks;
