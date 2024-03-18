"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useState, useMemo } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";
import Link from "next/link";
import { CameraIcon, CloseIcon } from ".";
import { useGetSessionData } from "@/helpers";
import DefaultCover from "@/assets/AFAFAF-bg.png";
import { edgestoreType } from "../../interfaces";
import { useTweet } from "@/context";

interface Props {
  onClose: () => void;
  onPost: () => void;
}

const UpdateProfileModal = ({ onClose, onPost }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const showModal = searchParams?.get("showModal");
  const userData = useGetSessionData();
  const { updateUserInfo, userProfile }: any = useTweet();

  const [formData, setFormData] = useState({
    bio: "",
    location: "",
  });

  useEffect(() => {
    if (showModal === "updateProfile") {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  const closeModal = () => {
    modalRef.current?.close();
    router.push(`/profile?profileId=${userProfile._id}`);
  };
  const { edgestore } = useEdgeStore();
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let edgestoreRes: edgestoreType = {};
    if (file) {
      edgestoreRes = await edgestore.publicImages.upload({ file });
    }
    //send data to database
    const tweetContentData = {
      bio: formData.bio,
      location: formData.location,
      coverImg: edgestoreRes?.url,
    };

    try {
      const userContentData = { tweetContentData, userId: userData._id };
      console.log(userContentData);
      await updateUserInfo(userContentData);
      // clear state
      setFormData({
        bio: "",
        location: "",
      });
      setFile("");
      router.refresh();
      // close modal
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const modal: JSX.Element | null =
    showModal === "updateProfile" ? (
      //main modal structure
      <div className=" absolute top-0 left-0 w-full h-screen z-50 backdrop-blur-sm ">
        <dialog
          ref={modalRef}
          className="w-[40%] md:w-[60%] h-[90%] fixed top-12 backdrop-blur-sm left-50 -translate-x-50  rounded-2xl bg-[#08090a]"
        >
          <form className="w-[95%] h-auto mx-auto flex flex-col items-center justify-center gap-3">
            {/* top section */}
            <div className="w-[100%] pt-3 grid grid-cols-[10%,70%,20%] gap-2 text-white z-10 backdrop-blur-md sticky h-24">
              {/* close button */}
              <div className="">
                <Link
                  href={`/profile?profileId=${userData?._id}`}
                  onClick={closeModal}
                  className="w-[100%] h-[100%] flex items-center justify-start m-auto font-bold text-xl "
                >
                  <CloseIcon />
                </Link>
              </div>
              {/* title section */}
              <div className="">
                <h1 className="w-[100%] h-[100%] flex items-center justify-start text-lg  font-semibold">
                  Edit Profile
                </h1>
              </div>
              {/* submit button */}
              <div className="">
                <div className="flex items-center justify-center h-full mx-auto">
                  <button
                    type="submit"
                    className="w-auto h-auto flex items-center justify-end bg-white rounded-2xl font-bold px-3 md:pr-3 py-1 text-black capitalize"
                    onClick={handleSubmit}
                  >
                    save
                  </button>
                </div>
              </div>
            </div>
            {/* cover image */}
            <div className="w-[99%] h-96 rounded-lg flex items-center justify-center bg-transparent">
              {imageUrl ? (
                <Image
                  alt="profileCover"
                  src={imageUrl}
                  width={0}
                  height={0}
                  className="w-[95%] rounded-lg top-32 h-80 absolute object-cover"
                />
              ) : (
                <Image
                  alt="profileCover"
                  src={DefaultCover}
                  className="w-[95%] rounded-lg top-32 h-80 absolute object-cover"
                />
              )}
              <div className="relative  flex items-center justify-center p-2 w-10 h-10 rounded-full hover:text-zinc-700 cursor-pointer">
                <label htmlFor="files">
                  <CameraIcon />
                </label>
                <input
                  className="hidden w-8 h-8"
                  id="files"
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files?.[0]);
                  }}
                />
              </div>
            </div>
            {/* BIO */}
            <div className="bg-black border-1 border-white w-full h-[150px] p-1 rounded-lg">
              <label className="w-[100%] h-[20%] pl-3 pt-2 font-medium text-base text-zinc-600">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                autoComplete="off"
                id="bioInput"
                maxLength={160}
                className="w-[100%] h-[80%] px-2 py-3 bg-black outline-none text-white rounded-text-base rounded-t-none"
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>
            {/* LOCATION */}
            <div className="bg-black border-1 border-white w-full h-[80px] p-1 rounded-lg">
              <label className="w-[100%] h-[20%] pl-3 pt-2 font-medium text-base text-zinc-600">
                Location
              </label>
              <input
                maxLength={30}
                type="text"
                name="location"
                value={formData.location}
                autoComplete="off"
                id="locationInput"
                className="w-[100%] h-[50%] px-2 py-3 bg-black outline-none text-white rounded-lg rounded-t-none"
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
          </form>
        </dialog>
      </div>
    ) : null;

  return modal;
};

export default UpdateProfileModal;
