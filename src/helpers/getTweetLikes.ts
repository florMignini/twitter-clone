

//get all likes from every tweet
export const getTweetLikes = async (tweetId: string) => {
    // const { supabaseClient } = useSupabaseClient()
    // const likes = await supabaseClient.from('likes').select('id', { count: 'exact' }).eq('tweet_id', tweetId)

    // return likes
}

//get all tweet likes that belong to user current session
export const sessionLikes = async (tweetId: string, profileId: string) => {
    // const { supabaseClient } = useSupabaseClient()
    // const currentSessionLikes = await supabaseClient.from('likes').select('id').eq('tweet_id', tweetId).eq('user_id', profileId).single();

    // return Boolean(currentSessionLikes.data?.id);
}