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
import { GiPhotoCamera } from "react-icons/gi";
import axios from "axios";
import { Tweet } from "../app/client_components/Tweet";
import { useTweet } from "@/context";
import { ThreeDots } from "react-loader-spinner";

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

  useEffect(() => {
    getAllTweetsByUser(profileId);
    getUserInfo(profileId);
  }, [profileId]);

  const handleCoverImage = async () => {
    try {
      const formCoverDataImage = new FormData();
      formCoverDataImage.append("cover-image", formData.coverImage);
      const coverImage = await axios.post(
        `/api/users/imageCover`,
        formCoverDataImage
      );
    } catch (error) {
      console.log(error);
    }
  };
  return !loading ? (
    <>
      <div className="w-full h-[30%] flex items-start justify-start flex-col z-0">
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
        <div className="relative w-[100%] h-[25%] flex flex-col items-start justify-start ">
          {/* front page */}
          <div className="absolute top-0 w-[100%] h-auto flex flex-col items-start justify-start rounded-md bg-slate-600">
            <Avatar
              src={userProfile?.imageUrl}
              className="w-36 h-36 relative top-14 m-1
            object-contain
            md:w-70 md:h-70 lg:w-70 lg:h-70
            xl:w-200
            xl:h-200 rounded-full mt-14 ml-4"
            />
            {/* change cover btn */}
          </div>
          {userProfile ? (
            <div className="absolute top-72 w-[100%] h-[25%] flex flex-col items-start justify-center pl-2 mt-5 mb-10">
              <div>
                <h3 className="text-xl">{userProfile?.username}</h3>
                <p className="font-thin text-xs">{`@${userProfile?.username}`}</p>
                <div className="flex items-center justify-center gap-2 pt-2 mb-2">
                  <BsCalendarWeek className="flex items-center justify-center w-4 h-4" />
                  <p className="font-thin text-md">{`Joined ${dayjs(
                    userProfile?.created_at
                  ).format("MMMM YYYY")}`}</p>
                </div>
              </div>
              <div>
                <button className="w-auto h-auto absolute z-10 px-3 py-1 right-4 bottom-20 border-1 border-gray-400 hover:border-black rounded-2xl font-semibold hover:bg-slate-600/25">
                  Edit Profile
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* user twitter section */}
      <div className="h-full w-[95%] flex flex-col items-center justify-start">
        {tweetsByUser?.map((tweet: tweetType) => (
          <Tweet key={tweet._id} {...tweet} />
        ))}
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
