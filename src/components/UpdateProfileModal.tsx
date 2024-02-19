"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";
import { Tweet as TweetInterface } from "../../interfaces";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { BsDot } from "react-icons/bs";
import dayjs from "dayjs";
import { Tweet } from "../app/client_components/Tweet";
import { CameraIcon, CloseIcon } from ".";
import { useGetSessionData } from "@/helpers";

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

  useEffect(() => {
    if (showModal === "updateProfile") {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  const closeModal = () => {
    modalRef.current?.close();
    onClose();
  };
  const handleCoverImage = async () => {
    try {
      /* const formCoverDataImage = new FormData();
      formCoverDataImage.append("cover-image", formData.coverImage);
      const coverImage = await axios.post(
        `/api/users/imageCover`,
        formCoverDataImage
      ); */
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
          className="w-[40%] md:w-[60%] h-[90%] p-1 fixed top-12 backdrop-blur-sm left-50 -translate-x-50  rounded-2xl bg-[#08090a]"
        >
          <form className="w-[95%] h-auto mx-auto flex flex-col items-center justify-center gap-3">
            {/* top section */}
            <div className="w-[100%] h-10 pt-3 grid grid-cols-[10%,80%,10%] gap-2 text-white">
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
                <button
                  type="submit"
                  className="w-auto h-auto flex items-center justify-end bg-white rounded-2xl font-bold px-3 md:pr-3 py-1 text-black capitalize"
                >
                  save
                </button>
              </div>
            </div>
            {/* cover image */}
            <div className="w-[100%] h-56 flex items-center justify-center rounded-md bg-transparent">
              <button className="flex items-center justify-center p-2 w-10 h-10 rounded-full hover:text-zinc-700"
              onClick={handleCoverImage}
              >
                <CameraIcon />
              </button>
            </div>
          </form>
        </dialog>
      </div>
    ) : null;

  return modal;
};

export default UpdateProfileModal;
