'use server'

import { randomUUID } from "crypto"
import { useSupabaseClient } from "./useSupabaseClient"



export const addLike = async (tweetId: string, profileId: string) => {
    const { supabaseClient } = useSupabaseClient()
       
        const { data, error } = await supabaseClient.from('likes').insert({
            id: randomUUID(),
            user_id: profileId,
            tweet_id: tweetId,
        })
        console.log(data, error)
    
}