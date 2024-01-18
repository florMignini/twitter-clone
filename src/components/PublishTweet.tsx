"use client"
import { useGetSessionData } from "@/helpers";
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BsFiletypeGif } from "react-icons/bs";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { AiOutlinePicture } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import React from "react";
import { useSocket, useTweet } from "@/context";

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
  //socket events
  const { socket }: any = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("tweetPublish", (newTweet: any) => {
      console.log(newTweet);
    });
  }, [socket]);
  const [formData, setFormData] = useState<FormData>({
    tweetContent: "",
    tweetImage: "",
  });
  const [file, setFile] = useState<any | string>("");

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
  // dropzone configuration
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
  });
  const [url, setUrl] = useState<string>();

  const { edgestore } = useEdgeStore();
  //google session
  const { data: session } = useSession();
  //bringing user session data && login session
  const userQuery = useGetSessionData();

  //tweet provider state & actions
  const {createTweet}:any = useTweet()
  
  const gifPreview: any = localStorage.getItem("gifPreview");


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    
    e.preventDefault();
    if (file) {
      const res = await edgestore.publicImages.upload({ file });
      setUrl(res.url);
    }

    //send data to database
    const tweetContentData = {
      tweetContent: formData.tweetContent,
      tweetImage: url ,
      tweetUserImage: session
        ? session?.user?.image
        : userQuery?.profile_picture,
    };

    try {
     
     await createTweet( tweetContentData);
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
          {imageUrl || gifPreview ? (
            <div className="relative">
              {imageUrl && (
                <Image
                  src={imageUrl ? imageUrl : gifPreview}
                  alt="imagePreview"
                  width={400}
                  height={400}
                  className="relative object-contain"
                />
              )}
              {/* Remove Image Icon */}
              {imageUrl || gifPreview ? (
                <div
                  className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
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
                  <div className="flex h-5 w-5 items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black">
                    <Button className="text-gray-80000 dark:text-gray-400">
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
const Button = React.forwardRef<
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
