"use client";
import React from "react";
import { Profile } from "@/components";
import UpdateProfileModal from "@/components/UpdateProfileModal";


const profile = () => {
  return (
   <>
   <UpdateProfileModal onClose={function (): void {
        throw new Error("Function not implemented.");
      } } onPost={function (): void {
        throw new Error("Function not implemented.");
      } }></UpdateProfileModal>
    <div className="w-full h-full z-0 bg-black border-l-[0.1px] border-r-[0.1px] border-slate-700 px-1">
      <Profile />
    </div>
   </>
  );
};

export default profile;
