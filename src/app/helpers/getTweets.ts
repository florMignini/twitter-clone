'use server'

import { GetTweets } from "../../../interfaces/getTweets.interface"
import { useSupabaseClient } from "./useSupabaseClient"

export const getTweets = async () => {
    const { supabaseClient } = useSupabaseClient()
    return await supabaseClient.from('tweets').select(`*,
        profiles (
            full_name,
            username
        )
        `).returns<GetTweets[]>()

}

