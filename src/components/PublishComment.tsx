'use client'

import { useGetSessionData } from "@/helpers";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";

interface FormData {
  commentContent: string,
  commentImage: string,
  tweetId?: string,
  userId?: string
}
type Props = {
  placeholder: string,
  BtnTitle: string,
  tweet: any
}
const PublishComment = ({placeholder, BtnTitle, tweet}:Props) => {
const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
      commentContent: "",
      commentImage: "",
    });
    //session user information
    const sessionUser = useGetSessionData()

    //apending data for comment creation
    formData.tweetId = tweet?._id
    formData.userId = sessionUser?._id

    const handleSubmit = async(e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try {
      const res = await axios.post('/api/comments/publish', formData)

      setFormData({
        commentContent: "",
        commentImage: ""
      })
    } catch (error) {
      console.log(error)
    }
    router.replace(`/profile/${tweet?._id}`)
    
  };
  return (
    <form onSubmit={handleSubmit}
    className="h-[190px] flex flex-col items-start justify-between"
    >
      <div className="w-[95%] mx-1 overflow-y-clip">
        <input
          type="text"
          name="commentContent"
          value={formData.commentContent}
          placeholder={placeholder}
          autoComplete="off"
          className=" w-full h-[90%] bg-transparent 
        placeholder:text-gray-600
        outline-none border-none border-b-[0.5px] px-2 py-2 text-xl font-light "
          id="commentInput"
          onChange={(e) => setFormData({...formData, commentContent: e.target.value})}
        />
      </div>
      <div>{/* everyone can reply */}</div>
      <div className=" w-full justify-between items-center flex">
        <div></div>
        <div className="w-[100%] h-[10%] flex items-center justify-between p-2">
          <button className="w-8 h-8 flex items-center justify-center text-blue-600 rounded-full hover:bg-blue-800/20">
            <input className="hidden" name="commentImage" type="file" id="image-upload" accept="image/*"
          value={formData.commentImage}
          onChange={(e) => setFormData({...formData, commentImage: e.target.value})}
            />
          <AiOutlinePicture 
          className="w-[50%] h-[50%]" 
          />
          </button>
          <button 
          type="submit"
          className="w-[20%] rounded-3xl bg-blue-600 mb-1 py-1 px-4 text-md hover:bg-opacity-70 transition duration-200">
            {BtnTitle}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PublishComment;
