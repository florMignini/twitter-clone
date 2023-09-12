'use client'

import axios from "axios";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
interface FormData {
  tweetContent: string,
  tweetImage: string
}
const PublishTweet = () => {
const router = useRouter()
 
    const [formData, setFormData] = useState<FormData>({
      tweetContent: "",
      tweetImage: "",
    });

    const handleSubmit = async(e: { preventDefault: () => void; }) => {
      e.preventDefault();

    try {
      const res = await axios.post('/api/tweets/publish', formData)
      setFormData({
        tweetContent: "",
        tweetImage: ""
      })
    } catch (error) {
      console.log(error)
    }
    router.replace('/')
    
  };
  return (
    <form onSubmit={handleSubmit}
    className="h-[190px] flex flex-col items-start justify-between"
    >
      <div className="mx-1 overflow-y-auto">
        <input
          type="text"
          name="tweetContent"
          value={formData.tweetContent}
          placeholder="What is happening?!"
          autoComplete="off"
          className=" w-full h-[90%] bg-transparent 
        placeholder:text-gray-600
        outline-none border-none border-b-[0.5px] px-2 py-2 text-xl font-light "
          id="tweetInput"
          onChange={(e) => setFormData({...formData, tweetContent: e.target.value})}
        />
      </div>
      <div>{/* everyone can reply */}</div>
      <div className=" w-full justify-between items-center flex">
        <div></div>
        <div className="w-[100%] h-[10%] flex items-center justify-between p-2">
          <button className="w-8 h-8 flex items-center justify-center text-blue-600 rounded-full hover:bg-blue-800/20">
            <input className="hidden" name="tweetImage" type="file" id="image-upload" accept="image/*"
          value={formData.tweetImage}
          onChange={(e) => setFormData({...formData, tweetImage: e.target.value})}
            />
          <AiOutlinePicture 
          className="w-[50%] h-[50%]" 
          />
          </button>
          <button 
          type="submit"
          className="w-[20%] rounded-3xl bg-blue-600 mb-1 py-1 px-4 text-md hover:bg-opacity-70 transition duration-200">
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default PublishTweet;
