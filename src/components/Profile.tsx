"use client";
import { BiArrowBack } from "react-icons/bi";
import { Avatar } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import useGetUserInfo from "@/helpers/useGetUserInfo";
import useGetTweetsByUser from "@/helpers/useGetTweetsByUser";
import dayjs from "dayjs";
import { BsCalendarWeek } from "react-icons/bs";
import Tweet from "@/app/client_components/Tweet";
import { Tweet as tweetType } from "../../interfaces";

const Profile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const profileId = searchParams.get("profileId");

  const profileInfoQuery = useGetUserInfo(profileId!);
  const profileTweets = useGetTweetsByUser(profileId!);
  
  const profileInfo = profileInfoQuery?.profileInfo;

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="sticky w-[100%] h-[10%] flex items-start justify-start py-1 px-2">
        {/* top section */}
        <button
          className="w-5 h-10 mr-4 cursor-pointer"
          onClick={() => router.back()}
        >
          <BiArrowBack className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold">{profileInfo?.username}</h1>
      </div>
      {/* user section */}
      <div className="w-[90%] h-[40%] flex flex-col items-center justify-between ">
        {/* front page */}
        <div className="w-[100%] h-[55%] flex items-center justify-center bg-slate-600 relative">
          <Avatar
            src="https://avatars.githubusercontent.com/u/30373425?v=4"
            className="w-[35%] h-[65%] md:w-[30%] md:h-[75%] lg:w-[25%] lg:h-[90%]
            xl:w-[25%]
            xl:h-[70%] absolute bottom-[-15%] left-3"
          />
          <div className="w-[100%] h-[10%] relative ">
            <div className="absolute top-40 left-2">
              <h3 className="text-xl">{profileInfo?.username}</h3>
              <p className="font-thin text-xs">{`@${profileInfo?.username}`}</p>
              <div className="flex items-center justify-center gap-2 pt-2 mb-2">
                <BsCalendarWeek className="flex items-center justify-center w-4 h-4"/>
                <p className="font-thin text-md">{`Joined ${dayjs(
                  profileInfo?.created_at
                ).format("MMMM YYYY")}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* user twitter section */}
      <div className="w-[90%] flex flex-col items-center justify-center">
        {
          profileTweets?.map((tweet: tweetType) => (
            <Tweet
            key={tweet._id}
            {...tweet}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Profile;
