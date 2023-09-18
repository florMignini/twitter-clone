'use client'

import React from "react";
import {User , Link} from "@nextui-org/react";
import { useGetSessionData } from "@/helpers";

export default function UserAvatar() {

  const { data, error } = useGetSessionData()
  
  let sessionProfile = data?.data.profileInfo
  return (
    <User   
      name={sessionProfile?.username.toUpperCase()}
      description={(
        <Link size="sm"
        href="/profile"
        >
          @{sessionProfile?.username}
        </Link>
      )}
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
      }}
    />
  );
}
