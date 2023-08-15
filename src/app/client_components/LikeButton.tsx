'use client'
import React, { useTransition } from 'react'
import { addLike, removeLike } from '../helpers'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

type LikeProps = {
  tweetId: string,
  profileId: string,
  likes: number | null
  currentSessionLikes: boolean
}
const LikeButton = ({ tweetId, profileId, likes, currentSessionLikes }: LikeProps) => {
  const [isLikingPending, startTransition] = useTransition()
  return (
    <button
      onClick={() => startTransition(() => currentSessionLikes
         ? removeLike(tweetId, profileId) 
         : addLike(tweetId, profileId)
         )}
      className="flex items-center justify-center
            font-bold
            transition duration-200
            text-md
            hover:bg-red-400/20
          hover:text-red-600
          rounded-full h-8 w-8">
      {
        currentSessionLikes ?
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
          <AiOutlineHeart />
      }
    </button >
  )
}

export default LikeButton