// components/Feed.tsx
import TweetCard from "./TweetCard";

const tweets = [
  {
    name: "Flor Mignini",
    avatar: "https://i.pravatar.cc/150?img=3",
    content: "¡Estoy creando mi propio Twitter Clone en Next.js! 🚀",
    date: "hace 1 hora",
  },
  {
    name: "OpenAI Dev",
    avatar: "https://i.pravatar.cc/150?img=4",
    content: "Flor la está rompiendo con este proyecto 🔥",
    date: "hace 2 horas",
  },
  {
    name: "Coder X",
    avatar: "https://i.pravatar.cc/150?img=5",
    content: "¿Cuándo sale en producción? 👀",
    date: "hace 3 horas",
  },
];

export default function Feed() {
  return (
    <section className="max-w-xl mx-auto px-4 py-6">
      {tweets.map((tweet, idx) => (
        <TweetCard key={idx} {...tweet} />
      ))}
    </section>
  );
}
