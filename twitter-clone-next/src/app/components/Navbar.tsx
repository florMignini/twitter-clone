"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";

import Image from "next/image";
import useAuth from "../../../hooks/useAuth";
import Loader from "./Loader";

export default function Navbar() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") return null;

  if (loading) {
    return (
     <Loader />
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <nav className="w-full px-4 py-3 bg-black border-b border-white/10 flex justify-between items-center text-white">
      <div className="text-xl font-bold">Twitter Clone</div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-right hidden sm:block">
          <p className="font-medium">{user.displayName}</p>
          <p className="text-gray-400 text-xs">{user.email}</p>
        </div>
        {user.photoURL && (
          <Image
            src={user.photoURL}
            alt="avatar"
            width={36}
            height={36}
            className="rounded-full border border-white"
          />
        )}
        <button
          onClick={async () => {
            await signOut(auth);
            router.push("/login");
          }}
          className="ml-2 px-4 py-2 rounded bg-white text-black text-sm hover:bg-gray-200 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
