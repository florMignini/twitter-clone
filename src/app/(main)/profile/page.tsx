"use client";
import React from "react";
import { Profile } from "@/components";
import UpdateProfileModal from "@/components/UpdateProfileModal";


const profile = () => {
  return (
    <>
      <UpdateProfileModal
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onPost={function (): void {
          throw new Error("Function not implemented.");
        }}
      ></UpdateProfileModal>
      <div className="w-[99,5%] h-full z-0 min-h-full mx-auto">
        <Profile />
      </div>
    </>
  );
};

export default profile;
