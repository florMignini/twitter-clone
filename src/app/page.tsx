"use client";
import React from "react";
import { useGetTweets } from "@/helpers";
import Tweet, { Like } from "@/app/client_components/Tweet";
import PublishTweet from "@/components/PublishTweet";
import { Profile } from "../../interfaces";
import { Tweet as tweetType } from "../../interfaces";

export interface Tweet {
  comments: Comment[];
  content: string;
  likes: Like[];
  timestamp: string;
  _id: string;
  userId: Profile;
}

const page = () => {
  const { data, error } = useGetTweets();

  return (
    <main className="w-full h-full min-h-screen border-l-[0.1px] border-r-[0.1px] border-slate-700">
      <h1 className="text-2xl z-10 text-left px-5 py-3 font-bold backdrop-blur-md sticky w-full h-32 bg-black/10 top-0 bg-black">
        Home
      </h1>

      {/* Avatar */}
      <div className="h-[200px] border-b-[0.3px] border-t-[0.3px] px-3 pt-3 pb-0 border-slate-700 relative grid grid-cols-[8%,92%] gap-1 bg-slate-900">
        <div className="w-10 h-10 rounded-full bg-slate-400 px-3"></div>

        {/* Input */}
        <div className="">
          {/* input & everyone can reply section*/}
          <PublishTweet placeholder="What is happening?!" BtnTitle="Post" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center my-4">
        {error ? <h1>Something goes wrong with server</h1> : null}
        {data?.data.allTweets &&
          data?.data.allTweets.map((tweet: tweetType) => (
            <Tweet key={tweet._id} {...tweet} />
          ))}
      </div>
    </main>
  );
};

export default page;
