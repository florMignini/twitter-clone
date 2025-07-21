"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../lib/firebase";



type Props = {
  user: {
    displayName: string | null;
    photoURL: string | null;
    uid: string;
  };
  onAddTweet: () => void;
};

export default function NewTweetForm({ user, onAddTweet }: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const maxLength = 280;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = content.trim();
    if (!trimmed) return alert("El tweet no puede estar vacío.");
    if (trimmed.length > maxLength)
      return alert(`El tweet no puede superar ${maxLength} caracteres.`);

    setLoading(true);

    try {
      await addDoc(collection(db, "tweets"), {
        content: trimmed,
        name: user.displayName || "Usuario",
        avatar: user.photoURL || "/default-avatar.png",
        uid: user.uid, // 🛡️ important!! for user validate
        createdAt: serverTimestamp(),
      });
      

      setContent(""); // ✅ clear content after submit
      onAddTweet();   // ✅ refresh feed or perform any additional action
    } catch (error) {
      console.error("❌ Error al enviar el tweet:", error instanceof Error ? error.message : error);
      alert("Error al enviar el tweet. Revisá la consola.");
    } finally {
      setLoading(false); // ✅ reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        className="w-full p-3 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
        rows={3}
        maxLength={maxLength}
        placeholder="¿What's up?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />
      <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
        <span>{content.length} / {maxLength}</span>
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50 hover:bg-blue-700 transition"
        >
          {loading ? "Sending..." : "Tweet"}
        </button>
      </div>
    </form>
  );
}
