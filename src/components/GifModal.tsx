"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { useGetGiphy } from "@/helpers";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";
import { Search } from ".";
import { BsSearch } from "react-icons/bs";

interface Props {
  onClose: () => void;
  onPost: () => void;
}

const GifModal = ({ onClose, onPost }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const showModal = searchParams?.get("showModal");
  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    if (showModal === "y") {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  const closeModal = () => {
    modalRef.current?.close();
    router.push("/");
    onClose();
  };

  const clickPost = () => {
    onPost();
    closeModal();
  };
  //gif hook
  const { data, isLoading } = useGetGiphy(query ? query : "laugh");

  const clearInput = () => {
    setQuery("");
  };

  const sendToLocalStorage = (gif: string) => {
    localStorage.setItem("gifPreview", gif);
    closeModal();
  };

  const modal: JSX.Element | null =
    showModal === "y" ? (
      //main modal structure
      <div className="absolute top-0 left-0 w-full h-screen z-10 backdrop-blur-xl">
        <dialog
          ref={modalRef}
          className="fixed top-50 left-50 -translate-x-50 -translate-y-50 rounded-2xl z-100 bg-slate-900"
        >
          {/* main content */}
          <div className="w-[700px] max-w-full flex flex-col text-white overflow-x-hidden">
            <div className="flex flex-col items-center">
              <div className="w-full h-[40px] flex items-start pl-5 pt-2">
                <button
                  onClick={closeModal}
                  className="w-[10px] h-[10px] border-spacing-1 flex items-start bg-transparent border-black text-lg "
                >
                  X
                </button>
              </div>
              {/* search section */}
              <div className="w-full h-auto shadow-xl">
              <div className="sticky h-15 top-0 rounded-full bg-slate-900 backdrop-blur-lg text-gray-600 mt-1">
              </div>
        <div className="h-full w-full relative grid grid-cols-[10%,80%,10%] gap-2 p-3 text-sm">
          <label
            htmlFor="searchItem"
            className="flex items-center justify-center"
          >
            <BsSearch className="w-5 h-5" />
          </label>

          <input
            type="text"
            placeholder="Search for Gifs"
            className="bg-transparent outline-none flex border-none items-center justify-center
                  w-full
                  "
            value={query}
            autoComplete="off"
            onChange={({ target }) => setQuery(target.value)}
          />
          <div className="w-full ">
            {query ? (
              <button
                onClick={clearInput}
                className="w-5 h-5 font-bold mr-2 border-1 border-gray-600 rounded-full flex items-center justify-center"
              >
                X
              </button>
            ) : null}
          </div>
        </div>
      </div>
            </div>
            <div className="p-2">
              {isLoading ? (
                <div className="w-[90%] flex items-center justify-center gap-5 p-2">
                  <h1>Searching gifs</h1>
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="5"
                    color="rgb(59 130 246)"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </div>
              ) : (
                <div className="w-[100%] h-auto grid grid-cols-3 gap-1 items-center justify-center p-2 mt-5">
                  {data?.data?.data.map((gif: any) => (
                    <button
                      key={gif.id}
                      onClick={() =>
                        sendToLocalStorage(gif.images.fixed_width.url)
                      }
                    >
                      <Image
                        className="object-cover"
                        src={gif.images.fixed_width.url}
                        alt={gif.id}
                        width={200}
                        height={200}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </dialog>
      </div>
    ) : null;

  return modal;
};

export default GifModal;
