"use client";

import { useTweet } from "@/context";
import { useGetSessionData } from "@/helpers";
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { Button } from "./PublishTweet";
import Link from "next/link";
import { BsFiletypeGif } from "react-icons/bs";

interface FormData {
  commentContent: string;
  commentImage: string;
  tweetId?: string;
  userId?: string;
}
type Props = {
  placeholder: string;
  BtnTitle: string;
  tweet: any;
};
const PublishComment = ({ placeholder, BtnTitle, tweet }: Props) => {

  const {createComment}:any = useTweet()
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    commentContent: "",
    commentImage: "",
    tweetId: "",
    userId: "",
  });

  const [file, setFile] = useState<any | string>("");
  const [url, setUrl] = useState<string>();
  const imageUrl = useMemo(() => {
    if (typeof file === "string") {
      // in case a url is passed in, use it to display the image
      return file;
    } else if (file) {
      // in case a file is passed in, create a base64 url to display the image
      return URL.createObjectURL(file);
    }
    return null;
  }, [file]);

  //session user information
  const sessionUser = useGetSessionData();
  const { edgestore } = useEdgeStore();
  const gifPreview: any = localStorage.getItem("gifPreview");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (file) {
      const res = await edgestore.publicImages.upload({ file });
      setUrl(res.url);
    }

    //send data to database
    const commentContentData = {
      commentContent: formData.commentContent,
      commentImage: url,
      tweetId: tweet?._id,
      userId: sessionUser?._id,
    };
    try {
      await createComment(commentContentData)

      setFormData({
        commentContent: "",
        commentImage: "",
      });
      router.refresh()
    } catch (error) {
      console.log(error);
    }
    router.replace(`/profile/${tweet?._id}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
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
          onChange={(e) =>
            setFormData({ ...formData, commentContent: e.target.value })
          }
        />
      </div>
      <div>{/* everyone can reply */}</div>
      <div className=" w-full justify-between items-center flex">
      <div className="px-2 py-6 m-auto">
          {imageUrl || gifPreview ? (
            <div className="relative">
              {imageUrl ||
                (gifPreview && (
                  <Image
                    src={imageUrl ? imageUrl : gifPreview}
                    alt="imagePreview"
                    width={400}
                    height={400}
                    className="relative object-contain"
                  />
                ))}
              {/* Remove Image Icon */}
              {imageUrl || gifPreview ? (
                <div
                  className="group absolute right-3 top-3 -translate-y-1/4 translate-x-1/4 transform"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (file) {
                      setFile("");
                    }
                    if (url) {
                      localStorage.removeItem("gifPreview");
                      setUrl("");
                    }
                  }}
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-md border border-solid border-gray-700 bg-white transition-all duration-300  dark:border-gray-400 dark:bg-black">
                    <Button className="h-7 w-7 text-gray-800 dark:text-gray-400">
                      X
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

         {/* buttons section */}
         {imageUrl || gifPreview ? (
            <div className="flex items-start justify-center" />
          ) : (
            <div className="flex items-start justify-center">
              {/* image section */}
              <div className="w-10 h-10 flex items-center justify-center text-blue-600 rounded-full hover:bg-blue-800/20">
                <label htmlFor="files">
                  <AiOutlinePicture className="w-[100%] h-[100%]" />
                </label>
              </div>
              <input
                className="hidden w-8 h-8"
                id="files"
                name="commentImage"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files?.[0]);
                }}
              />
              {/* gif section */}
            {/*   <Link
                href={`/?showModal=y`}
                className="w-10 h-10 flex items-center justify-center text-blue-600 rounded-full hover:bg-blue-800/20"
              >
                <label htmlFor="files">
                  <BsFiletypeGif className="w-[100%] h-[100%]" />
                </label>
              </Link> */}
            </div>
          )}
        <div className="w-[100%] h-[10%] flex items-center justify-between p-2">
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

export default PublishComment;
