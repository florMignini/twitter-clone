"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useGetTweet from "@/helpers/useGetTweet";
import Tweet from "@/app/client_components/Tweet";
import { Profile, PublishComment } from "@/components";
import CommentModal from "@/components/CommentModal";
import { Tweet as TweetType } from "@/app/page";
import { BiArrowBack } from "react-icons/bi";
import Comment from "@/components/Comment";


export interface CommentInterface {
  content: string;
  image: string | null;
  timestamp: string;
  tweetId: string;
  userId: string;
  _id: string;
}
interface Params {
  params: {
    id: string
  },
searchParams: {
  showModal: string
}
}

const SingleTweet = ( {params}:Params ) => {
  const {id} = params
  const router = useRouter(); 
  
  const { data, error } = useGetTweet(id);


  const onClose = () => {
    router.push(`/profile/${id}`)
  };
  const onPost = () => {
    console.log(`post clicked`);
  };
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="sticky w-[100%] h-[10%] flex items-start justify-start py-1 px-2">
        {/* modal section */}
        <CommentModal
          tweet={data?.data.singleTweet}
          onClose={onClose}
          onPost={onPost}
        >
          <PublishComment
            placeholder="Post your reply"
            BtnTitle="Reply"
            tweet={data?.data.singleTweet}
          />
        </CommentModal>
        {/* top section */}
        <button
          className="w-5 h-10 mr-4 cursor-pointer"
          onClick={() => router.back()}
        >
          <BiArrowBack className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold">Post</h1>
      </div>
      {error ? <h1>Something goes wrong with server</h1> : null}

      <Tweet {...data?.data.singleTweet} />
      <h6 className="p-2">Replies to @{data?.data.singleTweet.userId.username}</h6>
      {data?.data.singleTweet.comments.map((comment: CommentInterface) => (
        <Comment
          key={comment._id} {...comment}        
        />
      ))}
    </div>
  );
};

export default SingleTweet;
