"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import TweetCard from "./TweetCard";
import { AnimatePresence, motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import { db } from "../../../lib/firebase";
import NewTweetForm from "./forms/NewTweetForm";

type Tweet = {
  id: string;
  uid: string;
  name: string;
  avatar: string;
  content: string;
  createdAt: Timestamp;
};

export default function Feed() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "tweets"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tweetsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Tweet[];
      setTweets(tweetsData);
    });

    return () => unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <section className="max-w-xl mx-auto px-4 py-6">
      <NewTweetForm user={user} onAddTweet={() => {}} />
      <AnimatePresence>
        {tweets.map((tweet) => (
          <motion.div
            key={tweet.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <TweetCard
            id={tweet.id}
            uid={tweet.uid}
              name={tweet.name}
              avatar={tweet.avatar}
              content={tweet.content}
              date={tweet.createdAt?.toDate().toLocaleString() || ""}
              createdAt={tweet.createdAt}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
}
