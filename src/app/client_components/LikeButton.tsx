'use client'
import React, { useTransition } from 'react'
import { addLike } from '../helpers'
import { AiOutlineHeart } from 'react-icons/ai'
type LikeProps = {
    tweetId: string,
    profileId: string,
    likes: number | null
}
const LikeButton = ({tweetId, profileId, likes}: LikeProps) => {
    const [isLikingPending, startTransition] = useTransition()
  return (
      <button
          onClick={() => startTransition(() => addLike(tweetId,profileId))}
          className="flex items-center justify-center
            font-bold
            transition duration-200
            text-md
            hover:bg-red-400/20
          hover:text-red-600
          rounded-full h-8 w-8">
          <AiOutlineHeart />
      </button>
  )
}

export default LikeButton