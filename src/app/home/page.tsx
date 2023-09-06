'use client'
import PublishTweet from "@/components/PublishTweet";

import Tweet from "@/app/client_components/Tweet";
import { useGetTweets } from "@/helpers";


const Home = () => {
    const {data, error} = useGetTweets()
console.log(data)
    return (
        <main className="w-full  overflow-visible h-full min-h-screen border-l-[0.3px] border-r-[0.3px] border-gray-600">

            <h1 className="text-2xl z-10 text-left px-5 py-3 font-bold backdrop-blur-md sticky w-full h-32 bg-black/10 top-0 bg-black">Home</h1>

            {/* Avatar */}
            <div className="border-b-[0.3px] border-t-[0.3px] px-3 pt-3 pb-0 border-gray-600 relative grid grid-cols-[8%,92%] gap-1">

                <div className="w-10 h-10 rounded-full bg-slate-400 px-3"></div>

                {/* Input */}
                <div className="">
                    {/* input & everyone can reply section*/}
                    <PublishTweet />
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col ">
                {error ? <h1>Something goes wrong with server</h1> : null}
                {
                   data?.data.allTweets && data?.data.allTweets.map
                   /* cambiar el any */((tweet:any) => (
                       <Tweet
                       key={tweet._id}
                        tweet={tweet}
                       />
                   ))
                }
            </div>
        </main>
    )
}
export default Home;