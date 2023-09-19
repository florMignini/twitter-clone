"use client";
import useGetBookmarks from "@/helpers/useGetBookmarks";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import Bookmark from "@/components/Bookmark";
import { BookmarkInterface } from "../../../interfaces";

const Bookmarks = () => {
  const data = useGetBookmarks();
  let user = data?.data?.data.allBookmarks[0].userId;

  // console.log(data?.data?.data.allBookmarks[0].tweets)
  return (
    <div className="w-full h-screen bg-black">
      <header className="w-[95%] flex items-center justify-between mb-2 p-1">
        <div className="w-[80%]">
          <h3 className="text-2xl font-semibold">Bookmarks</h3>
          <h4 className="font-thin">@{user?.username}</h4>
        </div>
        <button
          className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer hover:bg-slate-400/20
             rounded-full"
          onClick={() => console.log(`clear all bookmarks`)}
        >
          <BsThreeDots />
        </button>
      </header>
      {/* Bookmarks */}
      {
        data?.data?.data.allBookmarks[0].tweets.map((bookmark: any) => (
          <Bookmark
            key={bookmark._id}
            bookmark={bookmark}
            />
        ))
      }
    </div>
  );
};

export default Bookmarks;
