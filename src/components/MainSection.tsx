import PublishTweet from "@/app/server_components/PublishTweet";

import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoMdStats } from 'react-icons/io'
import { MdOutlineIosShare } from 'react-icons/md'

// dayjs import 
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import { getTweets } from "@/app/helpers/getTweets";
dayjs.extend(relativeTime)

export const MainSection = async () => {
    //fetching all tweets
    const allTweets = await getTweets()

    return (
        <main className="w-full overflow-visible h-full min-h-screen border-l-[0.3px] border-r-[0.3px] border-gray-600">

            <h1 className="text-2xl z-10 text-left px-5 py-3 font-bold backdrop-blur-md sticky w-full h-32 bg-black/10 top-0 bg-black">Home</h1>

            {/* Avatar */}
            <div className="border-b-[0.3px] border-t-[0.3px] px-4 py-4 border-gray-600 relative grid grid-cols-[8%,92%] gap-1">

                <div className="w-10 h-10 rounded-full bg-slate-400 px-3"></div>

                {/* Input */}
                <div className="">
                    {/* input & everyone can reply section*/}
                    <PublishTweet />
                </div>
            </div>

            {/* Twit content */}
            <div className="flex flex-col ">
                {allTweets?.error ? <h1>Something goes wrong with server</h1> : null}
                {
                   allTweets?.data && allTweets?.data.map((tweet) => (
                        <div
                            key={tweet.id}
                            className="relative grid grid-cols-[8%_92%] gap-2
      border-b-[0.3px] border-t-[0.3px] p-3
      ">
                            <div>
                                <div className="w-10 h-10 bg-slate-600 rounded-full" />
                            </div> {/* avatar section */}
                            <div>
                                <div className=" flex flex-col items-center">
                                    {/* twit header */}
                                    <div className="w-full flex items-center justify-evenly pr-1">
                                        <div className=" w-full flex items-center content-center">
                                            <p className="font-bold text-md">{tweet.profiles.full_name || ''}</p>
                                            <p className="font-thin text-md mx-1">@{tweet.profiles.username}</p>
                                            <div className="flex">
                                                <BsDot />
                                            </div>
                                            <p className="font-thin text-sm mx-1">{dayjs(tweet.created_at).fromNow()}</p>
                                        </div>
                                        <div className="w-8 flex items-center
              rounded-full h-8  font-bold
              text-md justify-center hover:bg-blue-800/20 
              hover:text-blue-600
              transition duration-200 text-xl">
                                            <BsThreeDots />
                                        </div>
                                    </div>
                                    {/* twit text */}
                                    <div className="w-full text-white text-start text-sm pt-1 pl-1">
                                      {tweet.text}
                                    </div>
                                    {/* media content */}
                                    <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl m-1"></div>
                                </div>
                                <div className="flex items-center justify-around space-x-2 w-full cursor-pointer">
                                    <div className="flex 
          rounded-full h-8 w-8  font-bold
          text-md
items-center justify-center hover:bg-blue-800/20 
          hover:text-blue-600
          transition duration-200
          ">
                                        <BsChat />
                                    </div>
                                    <div className="flex items-center justify-center 
            font-bold
            transition duration-200
            text-md
            hover:bg-green-400/20
          hover:text-green-600
          rounded-full h-8 w-8">
                                        <AiOutlineRetweet />
                                    </div>
                                    <div className="flex items-center justify-center
            font-bold
            transition duration-200
            text-md
            hover:bg-red-400/20
          hover:text-red-600
          rounded-full h-8 w-8">
                                        <AiOutlineHeart />
                                    </div>
                                    <div className="flex items-center justify-center 
            font-bold
            transition duration-200
            text-md
            hover:bg-blue-400/20
          hover:text-blue-600
          rounded-full h-8 w-8">
                                        <IoMdStats />
                                    </div>
                                    <div className="flex items-center justify-center 
            font-bold
            transition duration-200
            text-md
            hover:bg-blue-400/20
          hover:text-blue-600
          rounded-full h-8 w-8">
                                        <MdOutlineIosShare />
                                    </div>
                                </div>{/* bottom icons */}
                            </div>{/* twitt content */}

                        </div> //twitt container
                    ))
                }
            </div>
        </main>
    )
}




