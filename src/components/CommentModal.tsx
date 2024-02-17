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
  tweet: TweetInterface;
  onClose: () => void;
  onPost: () => void;
  children: React.ReactNode;
}

const CommentModal = ({ tweet, onClose, onPost, children }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const showModal = searchParams?.get("showModal");

  useEffect(() => {
    if (showModal === "y") {
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
    showModal === "y" ? (
      //main modal structure
      <div className="absolute top-0 left-0 w-full h-screen z-10 backdrop-contrast-50">
        <dialog
          ref={modalRef}
          className="fixed top-[14rem] backdrop-contrast-50 left-50 z-100 -translate-x-50 -translate-y-20 rounded-2xl bg-[#16181C]"
        >
          {/* main content */}
          {tweet?._id ? (
            <div className="w-[600px] max-w-full flex flex-col text-white ">
              <div className="flex flex-col items-center justify-center">
                <div className="w-full h-[40px] flex items-start pl-5 pt-2">
                  <button
                    onClick={closeModal}
                    className="w-[10px] h-[10px] border-spacing-1 flex items-start bg-transparent border-black text-lg "
                  >
                    X
                  </button>
                </div>
                {/* tweet content */}
                <Tweet tweet={tweet} component="comment modal" />
              </div>
              <div className="p-2">{children}</div>
            </div>
          ) : null}
        </dialog>
      </div>
    ) : null;

  return modal;
};

export default CommentModal;
