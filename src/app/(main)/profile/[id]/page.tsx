"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useGetTweet from "@/helpers/useGetTweet";
import { Tweet } from "@/app/client_components/Tweet";
import { Profile, PublishComment, Comment } from "@/components";


import { BiArrowBack } from "react-icons/bi";

import { useTweet } from "@/context";
import { CommentModal } from "@/components";

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
    id: string;
  };
  searchParams: {
    showModal: string;
  };
}

const SingleTweet = ({ params }: Params) => {
  const { id } = params;
  const router = useRouter();
const {getSingleTweet, tweet}:any = useTweet()


  useEffect(() => {
    getSingleTweet(id)
  }, [id, getSingleTweet])
  

  const onClose = () => {
    router.push(`/profile/${id}`);
  };
  const onPost = () => {
    console.log(`post clicked`);
  };
  return (
    <>
      {/* modal section */}
      <CommentModal
        tweet={tweet}
        onClose={onClose}
        onPost={onPost}
      >
        <PublishComment
          placeholder="Post your reply"
          BtnTitle="Reply"
          tweet={tweet}
        />
      </CommentModal>
      <div className="w-full h-full flex flex-col">
        <div className="sticky w-[100%] h-[10%] flex items-start justify-start py-1 px-2">
          {/* top section */}
          <button
            className="w-5 h-10 mr-4 cursor-pointer"
            onClick={() => router.back()}
          >
            <BiArrowBack className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-semibold">Post</h1>
        </div>
        {!tweet ? <h1>Something goes wrong with server</h1> : null}

        <Tweet {...tweet} />
        <h6 className="p-2">
          Replies to @{tweet?.userId?.username}
        </h6>
        {tweet?.comments?.map((comment: CommentInterface) => (
          <Comment key={comment._id} {...comment} />
        ))}
      </div>
    </>
  );
};

export default SingleTweet;
