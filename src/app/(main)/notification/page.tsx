"use client";
import React, { useEffect } from "react";
import { useTweet } from "@/context";
import { useGetSessionData } from "@/helpers";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";

const Notification = () => {
  const userSession = useGetSessionData();
  const {
    updateUserSeen,
    loading,
    getNotificationsByUser,
    notificationsByUser,
  }: any = useTweet();
  const router = useRouter();

  useEffect(() => {
    getNotificationsByUser(userSession?._id);
  }, []);

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
      {notificationsByUser && notificationsByUser.length > 0 ? (
        <div className="w-[100%] flex items-center justify-start flex-col h-screen mx-auto gap-1">
          {notificationsByUser?.map((notification: any) => (
            <button
              className={`w-[100%] h-auto flex items-center justify-start gap-2 hover:bg-zinc-800/20 p-2 ${
                notification.seen ? "bg-slate-400" : "bg-zinc-600"
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
