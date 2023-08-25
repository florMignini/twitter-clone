'use client'

import React from "react";
import {User , Link} from "@nextui-org/react";
import axios from "axios";

export default function UserAvatar() {

  const getProfile = async() =>{
    const res = await axios.get('/api/users/profile')
    console.log(res.data)
  }
  return (
    <User   
      name="John Dorie"
      description={(
        <Link size="sm"
        onClick={getProfile}
        >
          @JohnDorie
        </Link>
      )}
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
      }}
    />
  );
}
