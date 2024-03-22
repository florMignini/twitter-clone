"use client";
import useGetBookmarks from "@/helpers/useGetBookmarks";
import React, { useEffect, useMemo, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Bookmark, { bookmark_type } from "../../../components/Bookmark";
import Link from "next/link";
import { useGetSessionData } from "@/helpers";
import { TailSpin } from "react-loader-spinner";
import { useTweet } from "@/context";
import { Tweet as tweetType } from "../../../../interfaces";
import { Tweet } from "../../client_components/Tweet";

const Bookmarks = () => {
  
  const user = useGetSessionData();
  const {bookmarksByUser, getBookmarsByUser, getAllTweets, loading, tweets, deleteAllBookmarks}:any = useTweet()

  useEffect(() => {
    getAllTweets()
    getBookmarsByUser(user?._id)
  }, [user?._id, bookmarksByUser, getAllTweets, getBookmarsByUser])

const tweetBookmarksByUser = useMemo(() => bookmarksByUser[0]?.tweets.map((tweetBookmark:any) => {
  return tweets.filter((tweet:any) => tweetBookmark._id === tweet._id)
}), [ bookmarksByUser])

  return (
    <div className="w-full pl-2 bg-black h-full min-h-screen mx-1">
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
          <header className="w-[95%] h-24 z-10 flex items-center justify-between mb-2 p-1 backdrop-blur-md sticky bg-black/10 top-0">
            <div className="w-[80%]">
              <h3 className="text-2xl font-semibold">Bookmarks</h3>
              <Link href={`/profile?profileId=${user?._id}`}>
                <h4 className="font-thin">@{user?.username}</h4>
              </Link>
            </div>
            <button
              className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer hover:bg-slate-400/20
               rounded-full"
              // onClick={() => deleteAllBookmarks( {userId:user?._id} )}
              // onClick={()=}
            >
              <BsThreeDots />
            </button>
          </header>
          {tweetBookmarksByUser && tweetBookmarksByUser?.map((tweet: [tweetType]) => (
            <Tweet key={tweet[0]?._id} tweet={tweet[0]} component="bookmark" />
          ))}
        </>
      )}
    </div>
  );
};

export default Bookmarks;
