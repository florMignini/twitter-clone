'use client'
import useGetBookmarks from '@/helpers/useGetBookmarks'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Tweet from '../client_components/Tweet'
import Bookmark from '@/components/Bookmark'

const Bookmarks = () => {
    const data = useGetBookmarks()
    console.log(data?.data?.data.allBookmarks)
  return (
    <div
    className='w-full h-screen bg-black'
    >
        <header className='w-[80%] flex items-center justify-between mb-2 p-1'>
            <div className='w-[80%]'>
                <h3 className='text-2xl font-semibold'>Bookmarks</h3>
                <h4 className='font-thin'>@username</h4>
            </div>
            <button className='w-[30px] h-[30px] flex items-center justify-center cursor-pointer hover:bg-slate-400/20
             rounded-full' 
             onClick={()=> console.log(`clear all bookmarks`)}
             >
                <BsThreeDots/>
            </button>
        </header>
        {/* Bookmarks */}
        {
            data && data?.data?.data.allBookmarks.map((bookmark:any/* sacar el any */)=>(
                <Bookmark
                />
            ))
        }
    </div>
  )
}

export default Bookmarks