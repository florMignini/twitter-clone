"use client";
import axios from "axios";
import { useGetSessionData, useGetUsers } from "@/helpers";
import { Search } from ".";

import Image from "next/image";
import Link from "next/link";

type userType = {
  _id: string;
  username: string;
  email: string;
  imageUrl: string;
  isGoogleSession: boolean;
  is_verify: boolean;
  following: string[];
  created_at: string;
};
const RightSidebar = () => {
  //bringing user session data && login session
  const userQuery = useGetSessionData();

  //get all Users
  const { data, isLoading } = useGetUsers();

  const followingList = data?.data?.allUsers?.filter(
    (user: userType) => user._id !== userQuery?._id
  );

  const userList =
    userQuery &&
    userQuery?.following?.map((user: userType) => {
      return user._id;
    });

  const suggestionsArray = followingList?.filter(
    (user: userType) => !userList?.includes(user?._id)
  );
// TODO: create a 3 element array list for suggestions and extend list button for get the full list of suggestions
  //Follow action
  const follow = async (followId: string, userId: string) => {
    await axios.post("/api/users/following", { followId, userId });
    await axios.post(`/api/notification`, {
      followId,
      userId,
      route: "follow",
    });
  };

  return (
    <section className="w-[300px] hidden fixed h-screen lg:flex flex-col px-5">
      {/* Search bar section */}
      <div className="mt-4">
        <Search placeholder="Search for people" section="rightsidebar" />
      </div>
      {/* Who to Follow */}
      {isLoading ? null : (
        <div className="w-fill flex flex-col rounded-2xl  bg-[#16181C] mt-2">
          <h3 className="text-xl font-bold py-3 px-4">Who to Follow</h3>
          <div>
            {suggestionsArray?.map((suggestion: userType) => (
              <button
                className="w-full my-2 flex items-center justify-between px-3 py-1 hover:bg-white/10
                      transition duration-200"
                key={suggestion._id}
              >
                <div className="w-[70%] flex items-center justify-start">
                  <Image
                    width={50}
                    height={50}
                    className="rounded-full flex items-center justify-center"
                    alt="userAvatar"
                    src={suggestion?.imageUrl}
                  />
                  <div className="flex flex-col items-center justify-start w-[100%] truncate pl-2">
                    <p className="w-[100%] text-sm font-thin flex items-center justify-start">
                      {`${suggestion?.username}`}
                    </p>
                    <Link
                      className="w-[100%] text-sm text-blue-300 flex items-center justify-start"
                      href={`/profile?profileId=${suggestion?._id}`}
                    >
                      {`@${suggestion?.username}`}
                    </Link>
                  </div>
                </div>
                <button
                  className="w-1/3 flex items-center justify-center px-5 py-1 bg-white rounded-2xl text-sm font-semibold text-black hover:opacity-80 lg:mb-2 "
                  onClick={() => follow(suggestion?._id, userQuery?._id)}
                >
                  Follow
                </button>
              </button>
            ))}
            <h4 className="text-md text-blue-400 p-4 cursor-pointer hover:bg-black/30 last:rounded-b-2xl">
              Show more
            </h4>
          </div>
        </div>
      )}
    </section>
  );
};

export default RightSidebar;
