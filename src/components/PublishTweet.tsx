"use client";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DropzoneOptions } from "react-dropzone";
import { AiOutlinePicture } from "react-icons/ai";
import { BsFiletypeGif } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

import { useGetSessionData } from "@/helpers";
import { useEdgeStore } from "@/lib/edgestore";

import { useTweet } from "@/context";

import { edgestoreType } from "../../interfaces";

const variants = {
  base: "relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out",
  image:
    "border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md",
  active: "border-2",
  disabled:
    "bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

type InputProps = {
  width: number;
  height: number;
  className?: string;
  value?: File | string;
  onChange?: (file?: File) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
};
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

  //tweet provider state & actions
  const { createTweet, tweet }: any = useTweet();

  const [formData, setFormData] = useState<FormData>({
    tweetContent: "",
    tweetImage: "",
  });

  const { edgestore } = useEdgeStore();

  //bringing user session data && login session
  const userQuery = useGetSessionData();
  const [file, setFile] = useState<any | string>("");
  const [url, setUrl] = useState<string>();

  const imageUrl = useMemo(() => {
    if (typeof file === "string") {
      return file;
    } else if (file) {
      return URL.createObjectURL(file);
    }
    return null;
  }, [file]);

  const gifPreview: any = localStorage.getItem("gifPreview");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let edgestoreRes: edgestoreType = {};
    if (file) {
      edgestoreRes = await edgestore.publicImages.upload({ file });
    }

    //send data to database
    const tweetContentData = {
      tweetContent: formData.tweetContent,
      tweetImage: edgestoreRes?.url || gifPreview,
      tweetUserImage: userQuery?.imageUrl,
      userId: userQuery?._id,
    };

    try {
      await createTweet(tweetContentData);
      setFormData({
        tweetContent: "",
        tweetImage: null,
      });
      setFile("");
      localStorage.removeItem("gifPreview");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUrl(gifPreview);
  }, [gifPreview]);

  return (
    <form className="h-auto flex flex-col items-start justify-between ">
      <div className="w-full h-auto mx-1 overflow-clip">
        <input
          type="text"
          name="tweetContent"
          value={formData.tweetContent}
          placeholder={placeholder}
          autoComplete="off"
          id="tweetInput"
          className="w-full h-[90%] bg-transparent 
        placeholder:text-gray-600 overflow-clip
        outline-none border-none border-b-[0.1px] px-2 py-2 text-xl font-light"
          onChange={(e) =>
            setFormData({ ...formData, tweetContent: e.target.value })
          }
        />
      </div>
      <div>{/* everyone can reply */}</div>
      <div className=" w-full justify-between items-center flex flex-col">
        <div className="px-2 py-6 m-auto">
          {imageUrl || gifPreview ? (
            <div className="relative">
              <Image
                src={imageUrl ? imageUrl : gifPreview}
                alt="imagePreview"
                width={400}
                height={400}
                className="relative object-contain rounded-lg"
              />

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
        <div className="w-[100%] h-[100%] flex items-center justify-between p-2">
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
                type="file"
                onChange={(e) => {
                  setFile(e.target.files?.[0]);
                }}
              />

              {/* gif section */}
              <Link
                href={`/?showModal=y`}
                className="w-10 h-10 flex items-center justify-center text-blue-600 rounded-full hover:bg-blue-800/20"
              >
                <label htmlFor="files">
                  <BsFiletypeGif className="w-[100%] h-[100%]" />
                </label>
              </Link>
            </div>
          )}
          {/* upload button */}
          <button
            onClick={handleSubmit}
            className="w-[20%] rounded-3xl bg-blue-600 mb-1 py-1 px-4 text-md hover:bg-opacity-70 transition duration-200"
          >
            {BtnTitle}
          </button>
        </div>
      </div>
    </form>
  );
};
export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={twMerge(
        // base
        "focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
        // color
        "border border-gray-400 text-gray-400 shadow hover:bg-gray-100 hover:text-gray-500 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700",
        // size
        "w-16 h-16 rounded-md px-2 text-xs",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";
export default PublishTweet;
