'use client'
import React from 'react'
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoMdStats } from 'react-icons/io'
import { MdOutlineIosShare } from 'react-icons/md'
// dayjs import 
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import axios from 'axios';
import useGetLikes from '@/helpers/useGetLikes';
import { useRouter } from 'next/navigation';
import { useGetSessionData } from '@/helpers';
import useGetTweet from '@/helpers/useGetTweet';
import Link from 'next/link';


dayjs.extend(relativeTime)
export interface Like {
    timestamp: string,
    tweetId: string,
    userId: string,
    _id: string
}

/* cambiar any */
const Tweet = ({ tweet }: any) => {
    const router = useRouter()
    //bringing user session data for like assing
    const userQuery = useGetSessionData()

    const likeTweet = async (userId: string, tweetId: string) => {
        await axios.post('/api/likes/like', { userId, tweetId })
        router.push('/')
    }
    
    const unLikeTweet = async(userId: string, tweetId: string) => {
        await axios.post('/api/likes/unlike', { userId, tweetId })
        router.push('/')
    }

    //bring the userId from session like if it exist
    const result = tweet?.likes?.filter((like: Like) => like.userId === userQuery.data?.data.profileInfo._id)[0]?.userId;
 
    return (
        <div
            key={tweet?._id}
            className="w-[95%] relative grid grid-cols-[8%_92%] gap-2
      bg-slate-900 rounded-xl p-3 my-3
      ">
            <div>
                <div className="w-10 h-10 bg-slate-600 rounded-full" />
            </div> {/* avatar section */}
            <div>
                <div className=" flex flex-col items-center">
                    {/* tweet header */}
                    <div className="w-full flex items-center justify-evenly pr-1">
                        <Link className=" w-full flex items-center content-center"
                        href='/profile'
                        >
                            <p className="font-bold text-md">{tweet?.userId.username || ''}</p>
                            <p className="font-thin text-md mx-1">@{tweet?.userId.username}</p>
                            <div className="flex">
                                <BsDot />
                            </div>
                            <p className="font-thin text-sm mx-1">{dayjs(tweet?.timestamp).fromNow()}</p>
                        </Link>
                        <div className="w-8 flex items-center
              rounded-full h-8  font-bold
              text-md justify-center hover:bg-blue-800/20 
              hover:text-blue-600
              transition duration-200 text-xl">
                            <BsThreeDots />
                        </div>
                    </div>
                    
                         {/* twit text */}
                        <Link
                            href={`/profile/${tweet?._id}`}
                            className="w-[99%] flex flex-col items-start text-white text-start text-sm my-2 pt-1 pl-1">
                        {tweet?.content}
                
                    {/* media content only displayed if it is sent*/}
                    {/* <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl m-1"></div> */}
                   </Link>
                </div>
                <div className="flex items-center justify-around space-x-2 w-full cursor-pointer">
                    <Link
                    href={`/profile/${tweet?._id}?showModal=y`}
                    className="flex 
          rounded-full h-8 w-8  font-bold
          text-md
items-center justify-center hover:bg-blue-800/20 
          hover:text-blue-600
          transition duration-200
          ">
                        <BsChat />
                        {
                            tweet?.comments.length > 0 ? <p className='ml-1 text-xs'>{tweet?.comments.length}</p> : " "
                        }
                    </Link>
                    <div className="flex items-center justify-center 
            font-bold
            transition duration-200
            text-md
            hover:bg-green-400/20
          hover:text-green-600
          rounded-full h-8 w-8">
                        <AiOutlineRetweet />
                    </div>
                     <div
      
      className="flex items-center justify-center
            font-bold
            transition duration-200
            text-md
            hover:bg-red-400/20
          hover:text-red-600
          rounded-full h-8 w-8">
      {
        result ?
          (
                <button className='flex items-center justify-center gap-1 text-red-500'
                onClick={()=>unLikeTweet(userQuery.data?.data?.profileInfo._id, tweet?._id)}
                >
                  <AiFillHeart />
                </button>

                                ) :<button
                                
                                onClick={()=>likeTweet(userQuery.data?.data.profileInfo._id, tweet?._id)}>
                                    
          <AiOutlineHeart />
                                    </button>
                        }
                        {
                            tweet?.likes?.length > 0 ? (
                                <p className='ml-1 text-xs'>{tweet.likes?.length}</p>
                            )
                                : ""
                        }
    </div >
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
    )
}

export default Tweet