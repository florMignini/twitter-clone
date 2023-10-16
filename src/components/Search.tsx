"use client";
import { useGetGiphy, useGetQuerySearch } from "@/helpers";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { UserAvatar } from ".";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
type Props = {
  placeholder: string;
  section: string;
};

export const Search = ({ placeholder, section }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [searchData, setSearchData] = useState<any>(null);

  useGetGiphy(query);
  // search for people action
  useEffect(() => {
    if (section !== "gifModal") {
      axios.get(`/api/users/search/${query}`).then((data) => {
        setSearchData(data?.data?.querySearch);
      });
    }
  }, [query, section]);

  const clearInput = () => {
    setQuery("");
    setSearchData(null);
  };

  return (
    <div className="w-full h-auto shadow-xl">
      <div className="sticky h-15 top-0 rounded-full bg-slate-900 backdrop-blur-lg text-gray-600 mt-1">
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
          <div className="w-full ">
            {query ? (
              <button
                onClick={clearInput}
                className="w-5 h-5 font-bold mr-2 border-1 border-gray-600 rounded-full flex items-center justify-center"
              >
                X
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className="w-[99%] flex items-start justify-center hover:bg-white/10
                      transition duration-200 m-1 rounded-md"
      >
        {searchData ? (
          <div className="w-[80%] flex items-center justify-center">
            {searchData.map((user: any) => (
              <Link
                key={user._id}
                href={`/profile?profileId=${user?._id}`}
                className="w-full my-2 flex items-center justify-between space-x-1 px-3 py-1 "
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
    </div>
  );
};
