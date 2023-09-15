'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import useGetTweet from '@/helpers/useGetTweet'
import Tweet from '@/app/client_components/Tweet'
import { Profile, PublishComment } from '@/components'
import CommentModal from '@/components/CommentModal';
import { Tweet as TweetType } from '@/app/home/page'
import { BiArrowBack } from 'react-icons/bi'



const SingleTweet = ({ params }: any) => {
const router = useRouter()
  const {data, error} = useGetTweet(params.id)
const onClose = () => {
  console.log(`close clicked`)
}
const onPost = () => {
  console.log(`post clicked` )
}
  return (
    <div className="w-full h-screen flex flex-col ">
      <div className="sticky w-[100%] h-[10%] flex items-start justify-start py-1 px-2">
        {/* modal section */}
        <CommentModal tweet={data?.data.singleTweet} onClose={onClose} onPost={onPost}>
            <PublishComment
            placeholder='Post your reply'
            BtnTitle='Reply'
            />
        </CommentModal>
        {/* top section */}
        <button 
        className="w-5 h-10 mr-4 cursor-pointer"
        onClick={() => router.back()}>
          <BiArrowBack 
          className='w-5 h-5'
          />
        </button>
        <h1 className="text-2xl font-semibold">Post</h1>
        </div>
    {error ? <h1>Something goes wrong with server</h1> : null}
   
           <Tweet
            tweet={data?.data.singleTweet}
           />

</div>
     
  )
}

export default SingleTweet