"use client";
import { useDebounce } from "@/helpers";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useRouter } from "next/navigation";
type Props = {
  placeholder: string;
  section: string;
};

export const Search = ({ placeholder, section }: Props) => {
  const router = useRouter()
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedSearch = useDebounce(query);
  const [users, setUsers] = useState([]);

  //searchUser
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const usersSearch = await axios.get(
        `/api/users/search/${debouncedSearch}`
      );
     setUsers(usersSearch.data);

      setLoading(false);
    };
    loadUsers();
  }, [debouncedSearch]);

  const clearInput = () => {
    setQuery("");
    router.refresh()
  };

  return (
    <div className="w-full h-auto shadow-xl">
      <div className="sticky h-15 top-0 rounded-full bg-[#16181C] backdrop-blur-lg text-gray-600 p-1 mt-1">
        <div className="h-full w-full relative grid grid-cols-[10%,80%,10%] gap-2 p-3 text-sm">
          <label
            htmlFor="searchItem"
            className="flex items-center justify-center"
          >
            <BsSearch className="w-5 h-5" />
          </label>

          <input
            type="text"
            placeholder={placeholder}
            className="bg-transparent outline-none flex border-none items-center justify-center
                  w-full
                  "
            value={query}
            autoComplete="off"
            onChange={({ target }) => setQuery(target.value)}
          />
          <div className="w-full">
            {debouncedSearch ? (
              <div className="">
                <button
                  onClick={clearInput}
                  className="w-5 h-5 font-bold border-1 border-gray-600 rounded-full flex items-center justify-center"
                >
                  X
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
          {query && loading ? (
       <div className="flex items-center justify-center">
         <ThreeDots
          visible={true}
          height="30"
          width="30"
          color="#f1f5f9"
          radius="4"
        />
       </div>
      ) : (
        <div
          className="w-[99%] flex items-start justify-center
                      transition duration-200 m-1 rounded-md"
        >
          {debouncedSearch ? (
            <div className="w-[90%] flex flex-col items-center justify-center ">
              {users.map((user: any) => (
                <Link
                  key={user._id}
                  href={`/profile?profileId=${user?._id}`}
                  className="w-full my-1 flex items-center justify-between space-x-1 px-4 py-1 bg-white/10 hover:bg-white/20 rounded-lg"
                  onClick={clearInput}
                >
                  <Image
                    width={50}
                    height={50}
                    className="rounded-full flex items-center justify-center"
                    alt="userAvatar"
                    src={user?.profile_picture}
                  />
                  <div className="flex flex-col items-center justify-start w-[100%] ">
                    <p className="w-[100%] text-sm font-thin">
                      {`${user?.username}`}
                    </p>
                    <p className="w-[100%] text-sm text-blue-300">
                      {`@${user?.username}`}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
