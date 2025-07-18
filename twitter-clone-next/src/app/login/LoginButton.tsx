"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export default function LoginButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full shadow-lg hover:bg-gray-100 transition disabled:opacity-50"
    >
      <FcGoogle className="text-xl" />
      {loading ? "Iniciando sesión..." : "Iniciar sesión con Google"}
    </button>
  );
}
