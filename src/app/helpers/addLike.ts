'use server'
import { Database } from "@/lib/supabase.types"
import { SupabaseClient } from "@supabase/supabase-js"
import { randomUUID } from "crypto"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

export const addLike = async (tweetId: string, profileId: string) => {

    if (supabaseUrl && supabaseSecretKey) {
        console.log(`me estoy ejecutando`)
        const supabaseClient = new SupabaseClient<Database>(supabaseUrl, supabaseSecretKey)
        const { data, error } = await supabaseClient.from('likes').insert({
            id: randomUUID(),
            user_id: profileId,
            tweet_id: tweetId,
        })
        console.log(data, error)
    }
}