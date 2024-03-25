"use client"
import React from 'react'
import { useTweet } from '@/context';
import { useGetSessionData } from '@/helpers';
import { useRouter } from 'next/navigation';
import { BiArrowBack } from 'react-icons/bi';
import { TailSpin } from 'react-loader-spinner';

 const Notification = () => {
    const userSession = useGetSessionData();
    const { userProfile, loading }: any = useTweet();
    const router = useRouter()
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
}

export default Notification;