'use server'

import { randomUUID } from "crypto"
import { useSupabaseClient } from "./useSupabaseClient"
import { revalidatePath } from "next/cache"



export const addLike = async (tweetId: string, profileId: string) => {
    const { supabaseClient } = useSupabaseClient()

    const { data, error } = await supabaseClient.from('likes').insert({
        id: randomUUID(),
        user_id: profileId,
        tweet_id: tweetId,
    })
    revalidatePath('/')

}

export const removeLike = async (tweetId: string, profileId: string) => {
    const { supabaseClient } = useSupabaseClient()

    const { data, error } = await supabaseClient.from('likes').delete().eq('tweet_id', tweetId).eq('user_id', profileId)
    revalidatePath('/')
}