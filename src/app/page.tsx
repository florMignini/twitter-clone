"use client";
import React, { useEffect } from "react";
import { useGetSessionData, useGetTweets } from "@/helpers";
import Tweet, { Like } from "@/app/client_components/Tweet";
import PublishTweet from "@/components/PublishTweet";
import { Profile } from "../../interfaces";
import { Tweet as tweetType } from "../../interfaces";
import { TailSpin } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GifModal from "@/components/GifModal";

export interface Tweet {
  comments: Comment[];
  content: string;
  likes: Like[];
  timestamp: string;
  _id: string;
  userId: Profile;
}

const Page = () => {
  const { data, error, isLoading } = useGetTweets();
  //login session
  const sessionProfile = useGetSessionData();
  //google account session
  const { data: session, status } = useSession();
 
  const router = useRouter();
  useEffect(() => {
    const res = axios.post("/api/users/signin", session?.user);
    router.push("/");
    router.refresh();
  }, [session, router]);
  
  /* modal states */
  const onClose = () => {
    router.push("/")
  };
  const onPost = () => {
    console.log(`post clicked`);
  };




  return isLoading ? (
   
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
      <GifModal onClose={function (): void {
          throw new Error("Function not implemented.");
        } } onPost={function (): void {
          throw new Error("Function not implemented.");
        } }></GifModal>
      
      <main className="w-full h-full z-0 min-h-screen border-l-[0.1px] border-r-[0.1px] border-slate-700">
        
      <h1 className="text-2xl z-10 text-left px-5 py-3 font-bold backdrop-blur-md sticky w-full h-32 bg-black/10 top-0 bg-black">
        Home
      </h1>

      {/* Avatar */}
      <div className="h-auto border-b-[0.3px] border-t-[0.3px] px-3 pt-3 pb-0 border-slate-700 relative grid grid-cols-[8%,92%] gap-1 bg-[#16181C]">
        <Image
          width={50}
          height={50}
          className="rounded-full flex items-center justify-center"
          alt="userAvatar"
          src={
            sessionProfile?.profile_picture
          }
        />

        {/* Input */}
        <div className="">
          {/* input & everyone can reply section*/}
          <PublishTweet placeholder="What is happening?!" BtnTitle="Post" />
        </div>
      </div>
      {isLoading ? (
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
          {error ? <h1>Something goes wrong with server</h1> : null}
          {data?.data.allTweets &&
            data?.data.allTweets.map((tweet: tweetType) => (
              <Tweet key={tweet._id} {...tweet} />
            ))}
        </div>
      )}
    </main>
      </>
    
  );
};

export default Page;
