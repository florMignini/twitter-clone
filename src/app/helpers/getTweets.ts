'use server'
import { SupabaseClient } from "@supabase/supabase-js"
import { GetTweets } from "../../../interfaces/getTweets.interface"


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

export const getTweets = async () => {
    if (supabaseUrl && supabaseSecretKey) {
        const supabaseClient = new SupabaseClient(supabaseUrl, supabaseSecretKey)
        return await supabaseClient.from('tweets').select(`*,
        profiles (
            full_name,
            username
        )
        `).returns<GetTweets[]>()
    }
}

