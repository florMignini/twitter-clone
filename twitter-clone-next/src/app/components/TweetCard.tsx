// components/TweetCard.tsx
import Image from "next/image";

type TweetProps = {
  name: string;
  avatar: string;
  content: string;
  date: string;
};

export default function TweetCard({ name, avatar, content, date }: TweetProps) {
  return (
    <div className="bg-white text-black rounded-xl p-4 shadow-sm hover:shadow-md transition mb-4">
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
