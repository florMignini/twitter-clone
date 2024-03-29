"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTweet } from "@/context";
import { useGetSessionData } from "@/helpers";
import { TailSpin } from "react-loader-spinner";
import { BiArrowBack } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

const Notification = () => {
  const userSession = useGetSessionData();
  const {
    updateUserSeen,
    loading,
    getNotificationsByUser,
    notificationsByUser,
    deleteAllNotifications,
  }: any = useTweet();
  const router = useRouter();

  const [showNotificationsAction, setShowNotificationsAction] = useState<boolean>(false);

  useEffect(() => {
    getNotificationsByUser(userSession?._id);
  }, []);
console.log(notificationsByUser)
  return !loading ? (
    <div className="w-full h-screen flex items-start justify-start flex-col z-0">
      <div className="w-[100%] h-24 flex items-center justify-between  py-1 px-2 sticky z-20 backdrop-blur-md top-0 bg-black/40">
        {/* top section */}
      <div className="flex items-center justify-center">
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
      {showNotificationsAction ? (
                <button 
                onClick={() => {
                  deleteAllNotifications( {userId:userSession?._id} )
                  setShowNotificationsAction(!showNotificationsAction)
                }}
                className="w-auto border-red-700 bg-red-400/20 rounded-xl p-1 font-bolds text-xs text-red-500">
                  Clear all notifications
                </button>
                  ) : (
                    <button
              className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer hover:bg-slate-400/20
               rounded-full"
              onClick={() => setShowNotificationsAction(!showNotificationsAction)}
            >
                <BsThreeDots />
                </button>
              )}
      </div>
      {notificationsByUser && notificationsByUser.length > 0 ? (
        <div className="w-[100%] flex items-center justify-start flex-col h-screen mx-auto gap-1">
          {notificationsByUser?.map((notification: any) => (
            <button
              className={`w-[100%] h-auto flex items-center justify-start gap-2  p-2 ${
                notification.seen ? "bg-zinc-800/20" : "bg-zinc-600/50"
              } `}
              key={notification?._id}
              onClick={() =>
                updateUserSeen({
                  notificationId: notification?._id,
                  userId: userSession?._id,
                })
              }
            >
              <div className="w-[100%] h-auto flex items-center justify-between">
                <div className="w-[50%] h-auto items-center justify-center flex flex-col">
                  <p className="w-[100%] text-base text-left font-bold truncate">
                    {notification?.content}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="w-[99%] flex items-center justify-start pt-28 flex-col h-screen mx-auto">
          <h1 className="w-[60%] font-bold text-4xl ">Nothing to see here -</h1>
          <h1 className="w-[60%] font-bold text-4xl ">yet</h1>
          <p className="w-[60%] text-base font-thin pt-5">
            Likes, follows, and a whole lot more — when it comes from a verified
            account, you’ll find it here.
          </p>
        </div>
      )}
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

export default Notification;
