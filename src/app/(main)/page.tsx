"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetSessionData, useGetTweets } from "@/helpers";
import { useTweet } from "@/context";
import { Like, Tweet } from "@/app/client_components/Tweet";
import PublishTweet from "../../components/PublishTweet";
import GifModal from "../../components/GifModal";
import { TailSpin } from "react-loader-spinner";
import { Tweet as tweetType } from "../../../interfaces";
import { Profile } from "../../../interfaces";

import Image from "next/image";

export interface Tweet {
  comments: Comment[];
  content: string;
  likes: Like[];
  timestamp: string;
  _id: string;
  userId: Profile;
}

const Page = () => {
  const router = useRouter();
  const { error } = useGetTweets();
  const { getAllTweets, tweets, loading }: any = useTweet();

  useEffect(() => {
    getAllTweets();
  }, [tweets]);

  //bringing user session data && login session
  const userQuery = useGetSessionData();

  /* modal states */
  const onClose = () => {
    router.push("/");
  };
  const onPost = () => {
    console.log(`post clicked`);
  };

  return loading ? (
    <div className="w-full h-screen flex pt-[50%] items-start justify-center">
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
      <GifModal
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onPost={function (): void {
          throw new Error("Function not implemented.");
        }}
      ></GifModal>

      <main className="w-full h-full z-0 min-h-screen border-l-[0.1px] border-r-[0.1px] border-slate-700 mx-1">
        <h1 className="text-2xl text-left px-5 py-3 font-bold z-10 backdrop-blur-md sticky w-full h-32 bg-black/10 top-0 bg-black">
          Home
        </h1>

        {/* Avatar */}
        {
          <div className="w-full h-auto border-b-[0.3px] border-t-[0.3px] px-3 pt-3 pb-0 border-slate-700 relative grid grid-cols-[8%,92%] gap-1 bg-[#16181C]">
            <div className="">
              {userQuery && (
                <Image
                  src={userQuery?.imageUrl}
                  alt="userImage"
                  width={80}
                  height={80}
                  className="relative object-contain rounded-full"
                />
              )}
            </div>
            {/* Input */}
            <div className="">
              {/* input & everyone can reply section*/}
              <PublishTweet placeholder="What is happening?!" BtnTitle="Post" />
            </div>
          </div>
        }
        {loading ? (
          <div className="w-full h-screen flex pt-[50%] items-start justify-center">
            <TailSpin
              height="40"
              width="40"
              color="#319bf0"
              radius="1"
              visible={true}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center my-4">
            {error ? (
              <h1>Something goes wrong with server</h1>
            ) : (
              <>
                {tweets &&
                  tweets.map((tweet: tweetType) => (
                    <Tweet key={tweet?._id} {...tweet} />
                  ))}
              </>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Page;
