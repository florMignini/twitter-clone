"use client";

import LoginButton from "./LoginButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../../hooks/useAuth";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  return (
    <main className="h-screen bg-black text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Image src={logo} alt="Logo" width={80} height={80} className="mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-2">Iniciá sesión en Twitter Clone</h1>
        <p className="text-gray-400 mb-8">
          Compartí tus pensamientos con el mundo en tiempo real.
        </p>
        <LoginButton />
      </motion.div>

      <footer className="absolute bottom-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Flor Mignini • App demo para portfolio
      </footer>
    </main>
  );
}
