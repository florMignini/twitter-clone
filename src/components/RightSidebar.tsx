'use client'
import { useGetSessionData, useGetUsers } from "@/helpers";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BsSearch, BsThreeDots } from "react-icons/bs";

type userType = {
  _id: string,
  username: string,
  email: string,
  profile_picture: string,
  isGoogleSession: boolean,
  is_verify: boolean,
  following: string[],
  created_at: string
}
export const RightSidebar = () => {
//bringing user session data && login session
const userQuery = useGetSessionData();
  const { data: session, status } = useSession();

// google session image
  const userImage = session?.user?.image!;
  
  //get all Users
  const {data, isLoading} = useGetUsers()

 const suggestionsArray = data?.data?.allUsers?.filter((user:userType) => user._id !== userQuery._id && !userQuery.following.includes(user._id));

  //Follow action
  const follow = async(userToFollowId:string, userId:string) => {
    await axios.post("/api/users/following", { userToFollowId, userId });
  }

  return (
    <section className="hidden xl:flex xl:fixed top-2 overflow-visible flex-col px-5 my-4" >
      {/* Search bar section */}
      <div className="sticky h-15 top-0 rounded-full bg-slate-900 backdrop-blur-lg text-gray-600 mt-1">
        <div className="h-full w-full relative grid grid-cols-[10%,90%] gap-4 p-3 text-sm">
          <label
            htmlFor="searchItem"
            className="flex items-center justify-center">
            <BsSearch className="w-5 h-5" />
          </label>
 
            <input
              type="text"
              placeholder="Search Twitter"
              className="bg-transparent outline-none flex border-none items-center justify-center
                  w-full
                  "
            />
    
        </div>
      </div>
      {/* Who to Follow */}
      {
        isLoading ? (
        null
        ): (
          <div className="w-fill flex flex-col rounded-2xl  bg-slate-900 mt-2">
          <h3 className="text-xl font-bold py-3 px-4">Who to Follow</h3>
          <div>
            {
             suggestionsArray?.map((suggestion:userType) => (
                <button className="w-full my-2 flex items-center justify-between space-x-1 px-3 py-1 hover:bg-white/10
                      transition duration-200"
               key={suggestion._id}
               >
                  <div className="flex">
                  <Image 
            width={50}
            height={50}
            className="rounded-full flex items-center justify-center"
            alt="userAvatar"
            src={ suggestion?.profile_picture } />
            <div className="flex flex-col items-center justify-start w-[100%] pl-1">
                <p className="w-[100%] text-sm font-thin">
                {`${suggestion?.username}`}
                </p>
              <Link className="w-[100%] text-sm text-blue-300" href={`/profile?profileId=${suggestion?._id}`}>
                  {`@${suggestion?.username}`}
                </Link>
            </div>
                  </div>
                 <button className="w-1/3 flex items-center justify-center mr-2 px-5 py-1 bg-white rounded-2xl text-sm font-semibold text-black hover:opacity-80 lg:mb-2"
                 onClick={()=> follow(suggestion?._id, userQuery?._id)}
                 >
                    Follow
                  </button>
                </button>
              ))
            }
            <h4 className="text-md text-blue-400 p-4 cursor-pointer hover:bg-gray-800/90 last:rounded-b-2xl">Show more</h4>
          </div>
        </div>
        )
    }
      {/* What's happening */}
      <div className="flex flex-col rounded-2xl  bg-slate-900 mt-4">
        <h3 className="text-xl font-bold p-4">What is happening</h3>
        <div>
          {
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="hover:bg-white/10 transition duration-200 p-3 w-full m-auto"
              >
                <div className="text-neutral-500 flex items-center justify-between">
                  <h6 className="text-xs">Trending in Argentina</h6>
                  <BsThreeDots
                    className=" text-md cursor-pointer"
                  />
                </div>
                <div className="font-bold text-lg">{`#trending ${i + 1}`}</div>
                <div className="text-xs text-neutral-500">20.0k</div>
              </div>
            ))
          }
          <h4 className="text-md text-blue-400 p-4 cursor-pointer hover:bg-gray-800/90 last:rounded-b-2xl">Show more</h4>
        </div>
      </div>
    </section>
  )
}
