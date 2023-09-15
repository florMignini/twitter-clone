'use client'
import useGetTweet from '@/helpers/useGetTweet'
import React from 'react'

const Tweet = ({ params }: any) => {

  const {data, error} = useGetTweet(params.id)
  // console.log(data , error)
  return (
    <div>tweet</div>
  )
}

export default Tweet