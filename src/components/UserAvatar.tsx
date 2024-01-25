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
// google session image
  const userImage = session?.user?.image!;

  return (
    <div className="w-[100%] h-[10%] m-1 flex items-center justify-center">
      {sessionProfile && (
        <div className="w-[100%] lg:grid lg:grid-cols-[20%,80%] md:flex md:justify-center items-center content-center gap-3">
          <Image 
          width={50}
          height={50}
          className="rounded-full flex items-center justify-center"
          alt="userAvatar"
          src={ sessionProfile?.profile_picture ? sessionProfile?.profile_picture : userImage } />
          <div className="lg:flex flex-col items-center justify-start w-[100%] hidden">
              <p className="w-[100%] text-sm font-thin">
              {`${sessionProfile?.username}`}
              </p>
            <Link className="w-[100%] text-sm text-blue-300" href="/profile">
                {`@${sessionProfile?.username}`}
              </Link>
          </div>
        </div>
      )}
    </div>
  );
}
