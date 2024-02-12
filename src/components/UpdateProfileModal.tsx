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

interface Props {
  onClose: () => void;
  onPost: () => void;
}

const UpdateProfileModal = ({ onClose, onPost }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const showModal = searchParams?.get("showModal");

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
    router.back();
  };

  const modal: JSX.Element | null =
    showModal === "updateProfile" ? (
      //main modal structure
      <div className="absolute top-0 left-0 w-full h-screen z-50 backdrop-blur-sm">
        <dialog
          ref={modalRef}
          className="fixed top-[14rem] backdrop-blur-sm left-50 -translate-x-50 -translate-y-20 rounded-2xl bg-[#16181C]"
        >
          <h1 className="text-white">Update Profile Component</h1>
        </dialog>
      </div>
    ) : null;

  return modal;
};

export default UpdateProfileModal;
