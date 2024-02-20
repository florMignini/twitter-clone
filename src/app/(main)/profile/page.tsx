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
    <div className="w-full h-screen z-0 bg-black">
      <Profile />
    </div>
   </>
  );
};

export default profile;
