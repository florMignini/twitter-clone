"use client";
import { BiArrowBack } from "react-icons/bi";
import { Avatar } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import useGetUserInfo from "@/helpers/useGetUserInfo";
import useGetTweetsByUser from "@/helpers/useGetTweetsByUser";
import dayjs from "dayjs";
import { BsCalendarWeek } from "react-icons/bs";
import Tweet from "@/app/client_components/Tweet";
import { Tweet as tweetType } from "../../interfaces";
import {GiPhotoCamera} from "react-icons/gi"
import { useState } from "react";
import axios from "axios";

type FormProfileData = {
  profileImage: any,
  coverImage: any;
}

const Profile = () => {
  
  const [formData, setFormData] = useState<FormProfileData>({
    profileImage: null,
    coverImage: null,
  });
 
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const profileId = searchParams.get("profileId");
  
  const profileTweets = useGetTweetsByUser(profileId!);
  const profileInfoQuery = useGetUserInfo(profileId!);
  //google account session
  const { data: session, status } = useSession();

  const profileInfo = profileInfoQuery?.profileInfo;


  const handleProfileImage = async() => {
    try {
      const formProfileDataImage = new FormData()
      formProfileDataImage.append('profile-image', formData.profileImage)
      formProfileDataImage.append('profile-id', profileInfo._id)
      const profileImage = await axios.post(`/api/users/imageProfile`, formProfileDataImage) 

    } catch (error) {
      console.log(error)
    }
  }
  const handleCoverImage = async() => {
    try {
      const formCoverDataImage = new FormData()
      formCoverDataImage.append('cover-image', formData.coverImage)
      const coverImage = await axios.post(`/api/users/imageCover`, formCoverDataImage) 

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
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
      <div className="relative w-[100%] h-auto flex flex-col items-start justify-center ">
        {/* front page */}
        <div className="absolute top-0 w-[100%] h-auto flex flex-col items-start justify-start rounded-md bg-slate-600">
          <Avatar
           src={ profileInfo?.profile_picture  }
            className="w-44 h-44 
            object-contain
            md:w-70 md:h-70 lg:w-70 lg:h-70
            xl:w-200
            xl:h-200 rounded-full mt-14 ml-4"
          />
          {/* change user avatar btn */}
          <button className=" w-8 h-8 absolute z-10 bottom-6 left-36 border-1 border-transparent hover:border-black rounded-full hover:bg-slate-600/25">
            <label htmlFor="files">
            <GiPhotoCamera
            className="text-transparent hover:text-black w-[100%] h-[100%] p-1"
            />
            </label>
            <input
              className="hidden w-8 h-8"
              id="files"
              type="file"
              onChange={(e) => {
                if (!e.target.files) return;
                setFormData({ ...formData, profileImage: e.target.files[0] });
              }}
              onClick={handleProfileImage}
            />
          </button>
          {/* change cover btn */}
         <button className="w-8 h-8 absolute z-10 bottom-2 right-8 border-1 border-transparent hover:border-black rounded-full hover:bg-slate-600/25">
            <label htmlFor="files">
            <GiPhotoCamera
            className="text-transparent hover:text-black w-[100%] h-[100%] p-1"
            />
            </label>
            <input
              className="hidden w-8 h-8"
              id="files"
              type="file"
              onChange={(e) => {
                if (!e.target.files) return;
                setFormData({ ...formData, coverImage: e.target.files[0] });
              }}
              onClick={handleCoverImage}
            />
          </button>
        </div>
        {
          profileInfo ? (
            <div className="absolute top-72 w-[100%] h-[30%] flex flex-col items-start justify-center pl-2 mt-5 mb-10">
           
            <h3 className="text-xl">{profileInfo?.username}</h3>
            <p className="font-thin text-xs">{`@${profileInfo?.username}`}</p>
            <div className="flex items-center justify-center gap-2 pt-2 mb-2">
              <BsCalendarWeek className="flex items-center justify-center w-4 h-4"/>
              <p className="font-thin text-md">{`Joined ${dayjs(
                profileInfo?.created_at
              ).format("MMMM YYYY")}`}</p>
            </div>
          
      </div>
          ) : null
       }
      </div>
      {/* user twitter section */}
      <div className="relative top-96 w-[90%] flex flex-col items-center justify-center">
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
