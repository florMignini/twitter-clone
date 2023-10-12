"use client";

import { useGetSessionData } from "@/helpers";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { BsFiletypeGif } from "react-icons/bs";
// import image from "../../preview/download.jpeg"
interface FormData {
  tweetContent: string;
  tweetImage?: any;
  tweetUserImage?: string;
}
type Props = {
  placeholder: string;
  BtnTitle: string;
};
const PublishTweet = ({ placeholder, BtnTitle }: Props) => {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<any>(null) //cambiar tipo
  const [formData, setFormData] = useState<FormData>({
    tweetContent: "",
    tweetImage: null,
  });
  //google session
  const { data: session } = useSession()
 //bringing user session data && login session
  const userQuery = useGetSessionData();

  //action for getting tweet image preview
  const imagePreview = async() => {
    try {
      const formDataImage = new FormData()
      formDataImage.append('tweet-image', formData.tweetImage)
      const tweetImage = await axios.post(`/api/tweets/preview`, formDataImage) 
setPreviewImage(tweetImage.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removePreview = async (public_id:string) => {
    try {
      const deleteImagePreview = await axios.post(`/api/tweets/deletePreview`, {public_id}) 
      if (deleteImagePreview) {
        setPreviewImage(null) 
      }

    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const tweetContent = {
      tweetContent: formData.tweetContent,
      tweetImage:  previewImage ? previewImage.secure_url : null,
      tweetUserImage:  session ? session?.user?.image : userQuery?.profile_picture,
    }
    try {
      const content = await axios.post("/api/tweets/publish", tweetContent);
      setFormData({
        tweetContent: "",
        tweetImage: null
      });
      setPreviewImage(null)
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };
// console.log(previewImage)
  return (
    <form
      onSubmit={handleSubmit}
      className="h-auto flex flex-col items-start justify-between "
    >
      <div className="w-full h-auto mx-1 overflow-clip">
        <input
          type="text"
          name="tweetContent"
          value={formData.tweetContent}
          placeholder={placeholder}
          autoComplete="off"
          className=" w-full h-[90%] bg-transparent 
        placeholder:text-gray-600 overflow-clip
        outline-none border-none border-b-[0.1px] px-2 py-2 text-xl font-light"
          id="tweetInput"
          onChange={(e) =>
            setFormData({ ...formData, tweetContent: e.target.value })
          }
        />
      </div>
      <div>{/* everyone can reply */}</div>
      <div className=" w-full justify-between items-center flex flex-col">
        <div className="px-2 py-6 m-auto">
        {
          previewImage ? (
              <div className="relative">
                 <Image
                src={previewImage.secure_url}
                alt="imagePreview"
                width={500}
                  height={400}
                  className="relative object-contain"
                />
                <button 
                onClick={() => removePreview(previewImage.public_id)}
                  className="w-7 h-7 flex items-center justify-center rounded-full font-bold absolute top-2 right-4 border-2 border-gray-600 text-gray-600 bg-gray-500/80">X</button>
                </div>
            ) : (
                null
)
          }
        </div>
        <div className="w-[100%] h-[100%] flex items-center justify-between p-2">
          {/* buttons section */}
          <div className="flex items-start justify-center">
            {/* image section */}
          <div
            className="w-10 h-10 flex items-center justify-center text-blue-600 rounded-full hover:bg-blue-800/20"
          >
            <label htmlFor="files">
              <AiOutlinePicture className="w-[100%] h-[100%]" />
            </label>
            <input
              className="hidden w-8 h-8"
              id="files"
              type="file"
              onChange={(e) => {
                if (!e.target.files) return;
                setFormData({ ...formData, tweetImage: e.target.files[0] });
              }}
              onClick={imagePreview}
            />
         
          </div>

          {/* gif section */}
          <Link
            href={`/?showModal=y`}
              className="w-10 h-10 flex items-center justify-center text-blue-600 rounded-full hover:bg-blue-800/20"
          >
            <label htmlFor="files">
              <BsFiletypeGif className="w-[100%] h-[100%]" />
            </label>
           {/*  <input
              className="hidden w-8 h-8"
              id="files"
              type="file"
              onChange={(e) => {
                if (!e.target.files) return;
                setFormData({ ...formData, tweetImage: e.target.files[0] });
              }}
              onClick={imagePreview}
            /> */}
         
          </Link>
          </div>
          {/* upload button */}
          <button
            type="submit"
            className="w-[20%] rounded-3xl bg-blue-600 mb-1 py-1 px-4 text-md hover:bg-opacity-70 transition duration-200"
          >
            {BtnTitle}
          </button>
        </div>
       
      </div>
    </form>
  );
};

export default PublishTweet;
