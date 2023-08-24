

import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'

import { cookies } from 'next/headers'


const PublishTweet = () => {

    async function addTweet(formData: FormData) {
        'use server'
       
    }
    return (
        <form action={addTweet}>
            <div className="h-62 mx-1">
                <div>{/*  border-gray-600 */}</div>
                <input type="text" name='tweet' placeholder="What is happening?!" autoComplete="off"
                    className=" w-full h-62 bg-transparent 
        placeholder:text-gray-600
        outline-none border-none border-b-[0.5px] px-2 py-2 text-xl font-light"
        id='tweetInput'
                />
            </div>
            <div>{/* everyone can reply */}</div>
            <div className=" w-full justify-between items-center flex">
                <div></div>
                <div className="p-2">
                    <button className="w-full rounded-3xl bg-blue-600 py-1 px-4 text-md hover:bg-opacity-70 transition duration-200"
                    >
                        Tweet
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PublishTweet


