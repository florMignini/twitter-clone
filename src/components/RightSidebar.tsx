"use client";
import { useGetSessionData, useGetUsers } from "@/helpers";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BsSearch, BsThreeDots } from "react-icons/bs";
import { Search } from ".";

type userType = {
  _id: string;
  username: string;
  email: string;
  profile_picture: string;
  isGoogleSession: boolean;
  is_verify: boolean;
  following: string[];
  created_at: string;
};
const RightSidebar = () => {
  //bringing user session data && login session
  const userQuery = useGetSessionData();
  const { data: session, status } = useSession();

  //get all Users
  const { data, isLoading } = useGetUsers();

  const suggestionsArray =
    data && userQuery
      ? data?.data?.allUsers?.filter(
          (user: userType) =>
            user._id !== userQuery._id &&
            !userQuery.following.includes(user._id)
        )
      : null;

  //Follow action
  const follow = async (userToFollowId: string, userId: string) => {
    await axios.post("/api/users/following", { userToFollowId, userId });
  };

  return (
    <section className="hidden fixed xl:flex top-2 overflow-visible flex-col px-5 my-4">
      {/* Search bar section */}
      <Search placeholder="Search for people" section="rightsidebar" />
      {/* Who to Follow */}
      {isLoading ? null : (
        <div className="w-fill flex flex-col rounded-2xl  bg-slate-900 mt-2">
          <h3 className="text-xl font-bold py-3 px-4">Who to Follow</h3>
          <div>
            {suggestionsArray?.map((suggestion: userType) => (
              <button
                className="w-full my-2 flex items-center justify-between space-x-1 px-3 py-1 hover:bg-white/10
                      transition duration-200"
                key={suggestion._id}
              >
                <div className="flex">
                  <Image
                    width={50}
                    height={50}
                    className="rounded-full flex items-center justify-center"
                    alt="userAvatar"
                    src={suggestion?.profile_picture}
                  />
                  <div className="flex flex-col items-center justify-start w-[100%] pl-1">
                    <p className="w-[100%] text-sm font-thin">
                      {`${suggestion?.username}`}
                    </p>
                    <Link
                      className="w-[100%] text-sm text-blue-300"
                      href={`/profile?profileId=${suggestion?._id}`}
                    >
                      {`@${suggestion?.username}`}
                    </Link>
                  </div>
                </div>
                <button
                  className="w-1/3 flex items-center justify-center mr-2 px-5 py-1 bg-white rounded-2xl text-sm font-semibold text-black hover:opacity-80 lg:mb-2"
                  onClick={() => follow(suggestion?._id, userQuery?._id)}
                >
                  Follow
                </button>
              </button>
            ))}
            <h4 className="text-md text-blue-400 p-4 cursor-pointer hover:bg-gray-800/90 last:rounded-b-2xl">
              Show more
            </h4>
          </div>
        </div>
      )}
    </section>
  );
};

export default RightSidebar;