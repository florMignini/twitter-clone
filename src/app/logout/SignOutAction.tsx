"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function SignOutAction({ deleteTokens }:any) {
  const deleteTokensRef = useRef(deleteTokens);
  const router = useRouter()

  useEffect(() => {
    deleteTokensRef.current = deleteTokens;
  });

  useEffect(() => {
    deleteTokensRef.current();
  }, []);
  router.push("/signin")
  router.refresh()
  return (
    <div className="w-[100%] h-screen flex items-center justify-center gap-2">
        <h1 className="text-2xl font-bold flex items-center justify-center">
            Redirecting
        </h1>
    <ThreeDots
      height="70"
      width="70"
      radius="5"
      color="rgb(59 130 246)"
      ariaLabel="three-dots-loading"
      visible={true}
    />
  </div>
  );
}