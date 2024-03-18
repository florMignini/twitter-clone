"use client";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Avatar } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import useGetUserInfo from "@/helpers/useGetUserInfo";
import useGetTweetsByUser from "@/helpers/useGetTweetsByUser";
import dayjs from "dayjs";
import { BsCalendarWeek } from "react-icons/bs";
import { Tweet as tweetType } from "../../interfaces";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
import { Tweet } from "../app/client_components/Tweet";
import { useTweet } from "@/context";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";
import DefaultCover from "@/assets/AFAFAF-bg.png"
import Image from "next/image";
import { useGetSessionData } from "@/helpers";

type FormProfileData = {
  profileImage: any;
  coverImage: any;
};

const Profile = () => {
  const [formData, setFormData] = useState<FormProfileData>({
    profileImage: null,
    coverImage: null,
  });
  const {
    getAllTweetsByUser,
    getUserInfo,
    userProfile,
    tweetsByUser,
    loading,
  }: any = useTweet();
  const router = useRouter();
  const searchParams = useSearchParams();
  const profileId = searchParams?.get("profileId");
const userSession = useGetSessionData()
console.log(userSession)
  useEffect(() => {
    getAllTweetsByUser(profileId);
    getUserInfo(profileId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);
console.log(userProfile)
  return !loading ? (
    <>
      <div className="w-full h-screen flex items-start justify-start flex-col z-0">
        <div className="w-[100%] h-24 flex items-start justify-start py-1 px-2 sticky z-20 backdrop-blur-md top-0 bg-black/40">
          {/* top section */}
          <button
            className="w-5 h-10 mr-4 cursor-pointer"
            onClick={() => router.back()}
          >
            <BiArrowBack className="w-5 h-5" />
          </button>
          {userProfile && tweetsByUser && (
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">
                {userProfile?.username}
              </h1>
              <p className="text-base font-thin ">
                {`${tweetsByUser?.length} `}{" "}
                {tweetsByUser?.length > 1 ? `posts` : `post`}
              </p>
            </div>
          )}
        </div>
        {/* user section */}
        <div className="relative w-[100%] h-screen flex flex-col items-start justify-start ">
          {/* front page */}
          
              <div className="absolute z-10 top-0 w-[100%] h-auto flex flex-col items-start justify-start rounded-md">
              { userProfile?.coverImg ? (
                <Image
                  alt="profileCover"
                  src={userProfile.coverImg}
                  width={500}
                  height={500}
                  className="w-[100%] rounded-lg top-0 h-64 absolute object-s"
                />
              ) : (
                <Image
                  alt="profileCover"
                  src={DefaultCover}
                  className="w-[100%] rounded-lg top-0 h-64 absolute object-cover"
                />
              )}
              <Avatar
              src={userProfile?.imageUrl}
              className="w-36 h-36 relative top-24 m-1
            object-contain
            md:w-70 md:h-70 lg:w-70 lg:h-70
            xl:w-200
            xl:h-200 rounded-full mt-14 ml-4"
            />
             {/* edit profile button */}
             <div className="absolute z-10 right-3 md:bottom-20 top-72">
             {
              userProfile._id === userSession._id ? (
                <Link
                  href={`/profile?showModal=updateProfile`}
                  className="w-auto h-auto  border-1 border-gray-400 px-3 py-1 hover:border-black rounded-2xl font-semibold hover:bg-slate-600/25"
                >
                  Edit Profile
                </Link>
              ) : null
             }
             </div>   
            
          </div>
          {userProfile ? (
            <div className="absolute top-80 w-[100%] h-32 flex flex-col items-start justify-center pl-2">
                <h2 className="text-xl font-bold text-white capitalize">
                  {userProfile?.username}
                </h2>
                <p className="font-thin text-[15px] text-zinc-600">{`@${userProfile?.username}`}</p>
                {/* bio section */}
                <div className="w-[90%] h-32 flex items-center justify-start ">
                  <p className="text-base font-normal text-white mt-2">
                    {userProfile.bio}
                  </p>
                </div>
                {/* joined and location section*/}
              <div className="w-[80%] md:w-[60%] lg:w-[70%] h-10 flex items-start justify-start md:text-[13px] text-[12px] font-thin gap-2 text-zinc-600">
                  {/* location */}
                  {
                    userProfile.location ? (
                      <div className="w-[50%] flex items-center justify-start gap-1 pt-2 mb-2">
                    <CiLocationOn className="flex items-center justify-center w-4 h-4 font-bold" />
                    <p className="">{userProfile.location}</p>
                  </div>
                    ): null
                  }
                  {/* joined */}
                  <div className="w-[50%] flex items-center justify-start gap-2 pt-2 mb-2">
                    <BsCalendarWeek className="flex items-center justify-center w-4 h-4 font-bold" />
                    <p className="">{`Joined ${dayjs(
                      userProfile?.created_at
                    ).format("MMMM YYYY")}`}</p>
                  </div>
                
              </div>
             
              {/* user twitter section */}
              <div className="absolute top-36 h-screen w-[100%] flex flex-col items-center justify-start mx-auto">
                {tweetsByUser?.map((tweet: tweetType) => (
                  <Tweet key={tweet._id} tweet={tweet} component="profile" />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <ThreeDots
        visible={true}
        height="40"
        width="40"
        color="#6bc3f9"
        radius="9"
      />
    </div>
  );
};

export default Profile;
