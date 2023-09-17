"use client"

import { useSearchParams } from "next/navigation"
import { useRef, useEffect } from "react"
import { Tweet as TweetInterface } from "../../interfaces"
import Tweet from "@/app/client_components/Tweet"

interface Props {
  tweet: TweetInterface,
  onClose: ()=>void,
  onPost: ()=> void,
  children: React.ReactNode
}

const CommentModal = ({tweet, onClose, onPost, children}:Props) => {

  const searchParams = useSearchParams();

  const modalRef = useRef<null | HTMLDialogElement>(null)
  const showModal = searchParams.get('showModal');

  useEffect(() => {
    if(showModal === 'y'){
      modalRef.current?.showModal()
    }else{
      modalRef.current?.close();
    }
  }, [showModal])
  
const closeModal = () => {
  modalRef.current?.close()
  onClose()
}

const clickPost = () => {
  onPost()
  closeModal()
}

const modal: JSX.Element | null = showModal === 'y' ? (
  //main modal structure
  <dialog
  ref={modalRef}
  className="fixed top-50 left-50 -translate-x-50 -translate-y-50 rounded-2xl z-10 backdrop-blur-xl  bg-slate-900"
  >
    {/* main content */}
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
        <Tweet tweet={tweet} />
      </div>
      <div className="p-2">
        {children}
      </div>
    </div>
  </dialog>
)
 : null

 
  return modal
}

export default CommentModal;