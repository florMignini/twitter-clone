
export interface GetTweets {
    id: string;
    text: string;
    profile_id: string;
    created_at: string;
    updated_at: string;
    profiles: Profiles;
}

export interface Profiles {
    full_name: null;
    username: string;
}
