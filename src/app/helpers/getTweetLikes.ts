import { useSupabaseClient } from "./useSupabaseClient"

export const getTweetLikes = async (tweetId: string) => {
    const { supabaseClient } = useSupabaseClient()
    const likes = await supabaseClient.from('likes').select('id', { count: 'exact' }).eq('tweet_id', tweetId)

    return likes
}