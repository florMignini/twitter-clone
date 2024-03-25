"use client"
import React, { useEffect } from 'react'
import { useTweet } from '@/context';
import { useGetSessionData } from '@/helpers';
import { useRouter } from 'next/navigation';
import { BiArrowBack } from 'react-icons/bi';
import { TailSpin } from 'react-loader-spinner';

 const Notification = () => {
    const userSession = useGetSessionData();
    const { userProfile, loading, getNotificationsByUser, notificationsByUser }: any = useTweet();
    const router = useRouter()

    useEffect(() => {  
        getNotificationsByUser(userSession?._id);
      }, []);

      
console.log(notificationsByUser)
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
        {userSession && (
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">{userSession?.username}</h1>
            <p className="text-base font-thin ">
              {`@${userSession?.username}`}
            </p>
          </div>
        )}
       
      </div>
      {
        notificationsByUser && (
            <div className="w-[99%] flex items-center justify-start flex-col h-screen mx-auto">
            {notificationsByUser?.map((notification: any) => (
                <div
                  className="w-[100%] h-auto flex items-center justify-start gap-2 hover:bg-zinc-800/20 p-2 rounded-lg"
                  key={notification?._id}
                >
                  <div className="w-[100%] h-auto flex items-center justify-between">
                    <div className="w-[50%] h-auto flex flex-col">
                      <p className="w-[100%] text-base font-bold truncate">
                        {notification?.content}
                      </p>
                      {/* <p className="w-[100%] text-base font-thin">{`@${notification?.username}`}</p> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
            )
        }
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