'use server'
import { Database } from "@/lib/supabase.types"
import { SupabaseClient } from "@supabase/supabase-js"


export const useSupabaseClient = () => {

        const supabaseClient = new SupabaseClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SECRET_KEY as string)
       
        return {
            supabaseClient
        }
    
}