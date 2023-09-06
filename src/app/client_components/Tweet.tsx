
import React from 'react'
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoMdStats } from 'react-icons/io'
import { MdOutlineIosShare } from 'react-icons/md'
// dayjs import 
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import axios from 'axios';
import useGetLikes from '@/helpers/useGetLikes';
import { revalidatePath } from 'next/cache';

dayjs.extend(relativeTime)


/* cambiar any */
const Tweet = ({ tweet }: any) => {
    const likeTweet = async (userId:string, tweetId:string) => {
        const liked = await axios.post('/api/likes/like', { userId, tweetId }) 
        revalidatePath('/home')
    }
    const { data, error } = useGetLikes()
    // console.log(data?.data.allLikes)
    const allLikes = data?.data.allLikes;
    return (
        <div
            key={tweet._id}
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
                            <p className="font-bold text-md">{tweet.userId.username || ''}</p>
                            <p className="font-thin text-md mx-1">@{tweet.userId.username}</p>
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
                        {tweet.content}
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
                   {/*  <LikeButton

                    /> */}
                     <button
      onClick={()=>likeTweet(tweet.userId._id, tweet._id)}
      className="flex items-center justify-center
            font-bold
            transition duration-200
            text-md
            hover:bg-red-400/20
          hover:text-red-600
          rounded-full h-8 w-8">
      {/* {
        allLikes.includes() ?
          (
            <div className=' text-red-500 '>
              {likes && likes > 0 ? (
                <div className='flex items-center justify-center gap-1 ' >
                  <AiFillHeart />
                  <p className='text-sm'>{likes}</p>
                </div>
              ) : null
              }
            </div>
          ) :
        } */}
        <AiOutlineHeart />
    </button >
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