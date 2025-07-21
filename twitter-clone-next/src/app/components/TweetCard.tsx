import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import useAuth from "../../../hooks/useAuth";

import dayjs from "dayjs";
import Image from "next/image";
import { formatRelativeDate } from "../../../utils/formatDate";
import { Timestamp } from "firebase/firestore";

type TweetProps = {
  id: string;
  uid: string;
  name: string;
  avatar: string;
  content: string;
  date: string;
  createdAt: Timestamp;
};

export default function TweetCard({
  id,
  uid,
  name,
  avatar,
  content,
  date,
}: TweetProps) {
  const { user } = useAuth();

  const handleDelete = async () => {
    const confirm = window.confirm("¿Seguro que querés eliminar este tweet?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "tweets", id));
    } catch (error) {
      console.error(
        "❌ Error al borrar tweet:",
        error instanceof Error ? error.message : error
      );
      alert("No se pudo eliminar el tweet.");
    }
  };

  return (
    <div className="bg-black/90 text-white rounded-xl p-4 shadow-sm hover:shadow-md transition mb-4">
     <div className="w-full flex gap-4 items-center justify-end mb-2">
  <span
    title={dayjs(date).format("D [de] MMMM [a las] HH:mm")}
    className="text-xs text-gray-400"
  >
    {formatRelativeDate(date)}
  </span>

  {user?.uid === uid && uid !== undefined && (
    <button
      onClick={handleDelete}
      className="text-xs text-red-500 hover:text-red-700"
      title="Eliminar tweet"
    >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block w-4 h-4 mr-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h10"
      />
    </svg>
    </button>
  )}
</div>

      <div className="flex items-start gap-3">
        <Image
          src={avatar}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-bold text-sm">{name}</p>
          <p className="text-gray-600 text-xs mb-1">{date}</p>
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
}
