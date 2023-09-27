"use client";

import React from "react";

import { useGetSessionData } from "@/helpers";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function UserAvatar() {
  //login session
  const sessionProfile = useGetSessionData();
  //google account session
  const { data: session, status } = useSession();
console.log(sessionProfile)
  console.log(session)
  const userImage = session?.user?.image!;
  const avatar = "https://avatars.githubusercontent.com/u/30373425?v=4";
  return (
    <div className="w-[100%] h-[10%] m-1 flex items-center justify-center">
      {session && (
        <div className=" w-[100%] flex items-center justify-between">
          <Image 
          width={50}
          height={50}
          className="rounded-full"
          alt="userAvatar"
          src={ userImage } />
          <div className="flex flex-col items-center justify-end w-[100%]">
              <p className="w-[100%] text-sm text-right font-thin">
              {`${session?.user?.name}`}
              </p>
            <Link className="w-[100%] text-sm text-right text-blue-300" href="/profile">
                {`@${session.user?.name}`}
              </Link>
          </div>
        </div>
      )}
      {
        sessionProfile && (
          <div className=" w-[100%] flex items-center justify-between">
          <Image 
          width={50}
          height={50}
          className="rounded-full"
          alt="userAvatar"
          src={ avatar} />
          <div className="flex flex-col items-center justify-end w-[100%]">
              <p className="w-[100%] text-sm text-right font-thin">
              {`${sessionProfile?.username}`}
              </p>
            <Link className="w-[100%] text-sm text-right text-blue-300" href="/profile">
              { `@${sessionProfile?.username}`}
              </Link>
          </div>
        </div>
        )
      }
    </div>
  );
}
