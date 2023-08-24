'use client'

import React from "react";
import {User , Link} from "@nextui-org/react";

export default function UserAvatar() {
  return (
    <User   
      name="John Dorie"
      description={(
        <Link size="sm">
          @JohnDorie
        </Link>
      )}
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
      }}
    />
  );
}
