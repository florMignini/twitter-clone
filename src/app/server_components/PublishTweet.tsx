import { Database } from '@/lib/supabase.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { randomUUID } from 'crypto'

import { cookies } from 'next/headers'
import React from 'react'

const PublishTweet = () => {
    async function addTweet(formData: FormData) {
        'use server'
        const supabase = createServerComponentClient<Database>({cookies})

        //getting user info
        const {data, error} = await supabase.auth.getUser()
        const tweetToPublish = formData.get('tweet')
        //clear input
         formData.set('tweet', ' ')
        if(!tweetToPublish) return
        console.log(data)
        await supabase.from("tweets").insert({
            profile_id: data.user?.id,
            text: tweetToPublish.toString(),
            id: randomUUID()
        })
    }
    return (
        <form action={addTweet}>
            <div className="h-62 mx-1">
                <div>{/*  border-gray-600 */}</div>
                <input type="text" name='tweet' placeholder="What is happening?!"
                    className=" w-full h-62 bg-transparent 
        placeholder:text-gray-600
        outline-none border-none border-b-[0.5px] px-2 py-2 text-xl font-light"
                />
            </div>
            <div>{/* everyone can reply */}</div>
            <div className=" w-full justify-between items-center flex">
                <div></div>
                <div className="p-2">
                    <button className="w-full rounded-3xl bg-blue-600 py-1 px-4 text-md hover:bg-opacity-70 transition duration-200">
                        Tweet
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PublishTweet

function createServerComponentSupabaseClient<T>(arg0: { cookies: () => import("next/dist/server/web/spec-extension/adapters/request-cookies").ReadonlyRequestCookies }) {
    throw new Error('Function not implemented.')
}
