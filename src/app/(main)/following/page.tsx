"use client";
import React from "react";
import axios from "axios";
import { useTweet } from "@/context";
import { useGetSessionData } from "@/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";

const Following = () => {
  const router = useRouter();
  const userSession = useGetSessionData();
  const { userProfile, loading }: any = useTweet();

  //Unfollow action
  const unfollow = async (followId: string, userId: string) => {
    await axios.post("/api/users/unfollowing", { followId, userId });
    await axios.post(`/api/notification`, { followId, userId, route:"unfollow" });
  };

  return !loading ? (
    <div className="w-full h-screen flex items-start justify-start flex-col z-0">
      <div className="w-[100%] h-24 flex items-start justify-start py-1 px-2 sticky z-20 backdrop-blur-md top-0 bg-black/40">
        {/* top section */}
        <button
          className="w-5 h-10 mr-4 cursor-pointer"
          onClick={() => router.back()}
        >
          <BiArrowBack className="w-5 h-5" />
        </button>
        {userProfile && (
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">{userProfile?.username}</h1>
            <p className="text-base font-thin ">
              {`@${userProfile?.username}`}
            </p>
          </div>
        )}
      </div>
      <div className="w-[99%] flex items-center justify-start flex-col h-screen mx-auto">
        {userSession &&
          userSession?.following?.map((follower: any) => (
            <div
              className="w-[100%] h-auto flex items-center justify-start gap-2 hover:bg-zinc-800/20 p-2 rounded-lg"
              key={follower?._id}
            >
              <div className="w-auto p-1 flex items-center justify-start">
                <Image
                  src={follower?.imageUrl}
                  alt="follower-user-image"
                  className="rounded-full"
                  width={50}
                  height={50}
                />
              </div>
              <div className="w-[100%] h-auto flex items-center justify-between">
                <div className="w-[50%] h-auto flex flex-col">
                  <h6 className="w-[100%] text-base font-bold">
                    {follower?.username}
                  </h6>
                  <p className="w-[100%] text-base font-thin">{`@${follower?.username}`}</p>
                </div>
                <div className="w-[50%] h-full flex items-center justify-end">
                  <button
                    className="w-1/3 flex items-center justify-center mr-2 px-5 py-1 bg-red-400 rounded-2xl text-sm font-semibold text-red-600 hover:opacity-80"
                    onClick={() => unfollow(follower?._id, userSession?._id)}
                  >
                    Unfollow
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <TailSpin
        height="40"
        width="40"
        color="#319bf0"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Following;
