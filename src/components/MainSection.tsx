import PublishTweet from "@/app/server_components/PublishTweet";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoMdStats } from 'react-icons/io'
import { MdOutlineIosShare } from 'react-icons/md'

export const MainSection = () => {
    return (
        <main className="w-full overflow-visible h-full min-h-screen border-l-[0.3px] border-r-[0.3px] border-gray-600">

            <h1 className="text-2xl text-left px-5 py-3 font-bold backdrop-blur-sm sticky w-full h-32 bg-black/10 top-0 bg-black">Home</h1>

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
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
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
                                            <p className="font-bold text-md">La_Florineta</p>
                                            <p className="font-thin text-md mx-1">@mariflor_la</p>
                                            <div className="flex">
                                                <BsDot />
                                            </div>
                                            <p className="font-thin text-sm mx-1">37m</p>
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
                                    <div className="text-white text-sm pt-1">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, aspernatur earum. Maxime ab quisquam, possimus, dignissimos mollitia, facere nisi illum aliquid sint repellendus nemo. Odit fugit ut voluptatum eaque dolore?
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




